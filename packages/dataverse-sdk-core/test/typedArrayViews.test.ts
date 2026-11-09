import { describe, expect, it } from "vitest";
import { serializeContent } from "../src/utils/HeaderUtils.js";
import { DataverseClient } from "../src/client/DataverseClient.js";
import type { FetchProvider } from "../src/abstractions/http.js";

async function bytesOf(body: BodyInit): Promise<number[]> {
  return [...new Uint8Array(await new Response(body).arrayBuffer())];
}

describe("#34: typed-array views send only their own bytes", () => {
  const buf = new ArrayBuffer(32);
  new Uint8Array(buf).forEach((_v, i, a) => (a[i] = i));

  it("new Uint8Array(buf, 10, 5) sends exactly 5 bytes", async () => {
    expect(await bytesOf(serializeContent(new Uint8Array(buf, 10, 5)))).toEqual([
      10, 11, 12, 13, 14,
    ]);
  });

  it.each([
    ["subarray", new Uint8Array(buf).subarray(4, 8), [4, 5, 6, 7]],
    ["Uint16Array view", new Uint16Array(buf, 2, 2), [2, 3, 4, 5]],
    ["DataView", new DataView(buf, 30, 2), [30, 31]],
  ])("%s", async (_label, view, expected) => {
    expect(await bytesOf(serializeContent(view))).toEqual(expected);
  });

  it("a whole ArrayBuffer, strings, Blobs and FormData go as-is; objects become JSON", () => {
    const fd = new FormData();
    const blob = new Blob(["x"]);
    expect(serializeContent(buf)).toBe(buf);
    expect(serializeContent("raw")).toBe("raw");
    expect(serializeContent(blob)).toBe(blob);
    expect(serializeContent(fd)).toBe(fd);
    expect(serializeContent({ a: 1 })).toBe('{"a":1}');
    expect(serializeContent([1, 2])).toBe("[1,2]");
  });

  it("the client sends exactly a view's bytes too", async () => {
    let received: number[] = [];
    const fetchProvider: FetchProvider = {
      fetch: async (_input, init) => {
        received = await bytesOf(init?.body ?? "");
        return new Response(null, { status: 204 });
      },
    };
    const client = new DataverseClient({
      baseUrl: "https://contoso.crm.dynamics.com",
      fetchProvider,
    });
    await client.send({
      method: "PATCH",
      url: "accounts(00000000-0000-0000-0000-000000000001)/new_file",
      headers: { "content-type": "application/octet-stream" },
      body: new Uint8Array(buf, 10, 5),
    });
    expect(received).toEqual([10, 11, 12, 13, 14]);
  });
});
