/**
 * #58: upload() takes a Blob, an ArrayBuffer or a typed-array view, and never needs Node's
 * `Buffer`, so it runs in browsers without a polyfill. Real DataverseClient + fake fetch.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createTestClient,
  jsonResponse,
  noContent,
  type FakeFetch,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { FileColumnClient } from "../src/index.js";

const ID = "00000000-0000-0000-0000-000000000001";

function setup(): { files: FileColumnClient; fake: FakeFetch } {
  const { client, fake } = createTestClient();
  fake.on("GET", "/EntityDefinitions", () =>
    jsonResponse({ value: [{ LogicalName: "account", PrimaryIdAttribute: "accountid" }] })
  );
  fake.on("POST", "/InitializeFileBlocksUpload", () =>
    jsonResponse({ FileContinuationToken: "tok" })
  );
  fake.on("POST", "/UploadBlock", () => noContent());
  fake.on("POST", "/CommitFileBlocksUpload", () => jsonResponse({ FileId: "f1" }));
  return { files: new FileColumnClient(client, client.getBaseUrl()), fake };
}

function body(fake: FakeFetch, path: string): Array<Record<string, unknown>> {
  return fake.requests
    .filter((r) => r.path === path)
    .map((r) => JSON.parse(r.bodyText ?? "{}") as Record<string, unknown>);
}

/** The bytes the UploadBlock requests carried, in order, decoded without Buffer. */
function uploadedBytes(fake: FakeFetch): Uint8Array {
  const parts = body(fake, "/UploadBlock").map((b) =>
    Uint8Array.from(atob(String(b.BlockData)), (c) => c.charCodeAt(0))
  );
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let offset = 0;
  for (const p of parts) {
    out.set(p, offset);
    offset += p.length;
  }
  return out;
}

/**
 * Act as a browser for this package's own code: any use of `Buffer` from `src/` throws the
 * browser's `ReferenceError`. Node's own internals (Response, fetch) keep the real Buffer.
 */
function hideBufferFromFilesPackage(): void {
  vi.stubGlobal(
    "Buffer",
    new Proxy(globalThis.Buffer, {
      get(target, prop, receiver) {
        // Frame 0 is "Error", 1 is this trap, 2 is the code that read `Buffer.<prop>`.
        const caller = new Error().stack?.split("\n")[2] ?? "";
        if (/dataverse-sdk-files[\\/]src[\\/]/.test(caller)) {
          throw new ReferenceError("Buffer is not defined");
        }
        return Reflect.get(target, prop, receiver) as unknown;
      },
    })
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("files: upload() input types (#58)", () => {
  it("uploads a Blob without touching Buffer, as in a browser", async () => {
    hideBufferFromFilesPackage();
    const { files, fake } = setup();
    await files.upload(
      "accounts",
      ID,
      "new_file",
      new Blob(["abc"], { type: "text/plain" }),
      "a.txt"
    );
    expect(new TextDecoder().decode(uploadedBytes(fake))).toBe("abc");
    expect(body(fake, "/CommitFileBlocksUpload")[0]).toMatchObject({
      FileName: "a.txt",
      MimeType: "text/plain",
    });
  });

  it("uploads an ArrayBuffer as application/octet-stream", async () => {
    hideBufferFromFilesPackage();
    const { files, fake } = setup();
    await files.upload("accounts", ID, "new_file", new Uint8Array([1, 2, 255]).buffer, "a.bin");
    expect([...uploadedBytes(fake)]).toEqual([1, 2, 255]);
    expect(body(fake, "/CommitFileBlocksUpload")[0]?.MimeType).toBe("application/octet-stream");
  });

  it("uploads only the bytes a typed-array view covers", async () => {
    hideBufferFromFilesPackage();
    const { files, fake } = setup();
    const backing = new Uint8Array([9, 9, 1, 2, 3, 9]);
    await files.upload("accounts", ID, "new_file", backing.subarray(2, 5), "a.bin");
    expect([...uploadedBytes(fake)]).toEqual([1, 2, 3]);
  });

  it("still uploads a Node.js Buffer", async () => {
    const { files, fake } = setup();
    await files.upload("accounts", ID, "new_file", Buffer.from("hello"), "a.txt");
    expect(new TextDecoder().decode(uploadedBytes(fake))).toBe("hello");
  });

  it("chunks every byte value correctly across blocks", async () => {
    hideBufferFromFilesPackage();
    const { files, fake } = setup();
    // (i * 7) % 256 visits all 256 byte values every 256 bytes, so each 512-byte block carries
    // every value twice. Small on purpose: under the Buffer proxy, 300 KB took >5 s on CI.
    const data = Uint8Array.from({ length: 1_536 }, (_, i) => (i * 7) % 256);
    await files.upload("accounts", ID, "new_file", data, "a.bin", { chunkSize: 512 });
    expect(body(fake, "/UploadBlock")).toHaveLength(3);
    expect(uploadedBytes(fake)).toEqual(data);
  });

  it("rejects an unsupported input before sending anything", async () => {
    const { files, fake } = setup();
    await expect(
      files.upload("accounts", ID, "new_file", "abc" as unknown as Blob, "a.txt")
    ).rejects.toBeInstanceOf(TypeError);
    expect(fake.requests).toHaveLength(0);
  });
});

describe("files: download() result (#58)", () => {
  it("returns a Blob without touching Buffer", async () => {
    hideBufferFromFilesPackage();
    const { client, fake } = createTestClient();
    fake.on("GET", `/accounts(${ID})/new_file/$value`, () => new Response("abc", { status: 200 }));
    const file = await new FileColumnClient(client, client.getBaseUrl()).download(
      "accounts",
      ID,
      "new_file"
    );
    expect(file).toBeInstanceOf(Blob);
    expect(await file.text()).toBe("abc");
  });
});
