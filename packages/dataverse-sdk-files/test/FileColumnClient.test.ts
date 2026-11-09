import { describe, it, expect, vi, beforeEach } from "vitest";
import { FileColumnClient } from "../src/FileColumnClient.js";
import type { RequestAdapter, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/** Answers the table lookup (#60) and InitializeFileBlocksUpload; 204 for everything else. */
function fileResponses(token: string) {
  return (request: RequestInformation): Promise<Response> => {
    if (request.url.includes("/EntityDefinitions")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ value: [{ LogicalName: "account", PrimaryIdAttribute: "accountid" }] }),
      } as Response);
    }
    if (request.url.includes("InitializeFileBlocksUpload")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ FileContinuationToken: token }),
      } as Response);
    }
    return Promise.resolve({ ok: true, status: 204 } as Response);
  };
}

describe("FileColumnClient", () => {
  let mockAdapter: RequestAdapter;
  let client: FileColumnClient;

  beforeEach(() => {
    mockAdapter = {
      send: vi.fn(),
    };

    client = new FileColumnClient(mockAdapter, "https://org.crm.dynamics.com/api/data/v9.2");
  });

  describe("constructor", () => {
    it("should create instance with adapter and baseUrl", () => {
      expect(client).toBeInstanceOf(FileColumnClient);
    });
  });

  describe("upload", () => {
    it("should upload small file in single chunk", async () => {
      const fileData = Buffer.from("a".repeat(1024)); // 1KB

      vi.mocked(mockAdapter.send).mockImplementation(fileResponses("token-123"));

      await client.upload("accounts", "guid-123", "new_logo", fileData, "logo.png");

      // 1 table lookup + 1 init + 1 upload + 1 commit = 4 calls
      expect(mockAdapter.send).toHaveBeenCalledTimes(4);
    });

    it("should upload large file in multiple chunks", async () => {
      // Small chunks keep the test fast; the 4 MB default has its own test below (#217).
      const fileData = new Uint8Array(10 * 1024).fill(97); // 10 KB = 3 chunks at 4 KB

      vi.mocked(mockAdapter.send).mockImplementation(fileResponses("token-456"));

      await client.upload("accounts", "guid-456", "new_document", fileData, "large.pdf", {
        chunkSize: 4 * 1024,
      });

      // 1 table lookup + 1 init + 3 uploads + 1 commit = 6 calls
      expect(mockAdapter.send).toHaveBeenCalledTimes(6);
    });

    it("should report progress during upload", async () => {
      const fileData = new Uint8Array(8 * 1024).fill(97); // 8 KB = 2 chunks at 4 KB

      vi.mocked(mockAdapter.send).mockImplementation(fileResponses("token-789"));

      const progressUpdates: number[] = [];
      await client.upload("accounts", "guid-789", "new_file", fileData, "medium.pdf", {
        chunkSize: 4 * 1024,
        onProgress: (progress) => {
          progressUpdates.push(progress.percentage);
        },
      });

      expect(progressUpdates).toEqual([50, 100]);
    });

    it("should normalize GUID format", async () => {
      const fileData = Buffer.from("small");

      const respond = fileResponses("token");
      vi.mocked(mockAdapter.send).mockImplementation((request) => {
        if (request.url.includes("InitializeFileBlocksUpload")) {
          // Check that GUID is normalized in body (no braces, lowercase)
          const body = request.body as { Target: { accountid: string } };
          expect(body.Target.accountid).toBe("aaaa-bbbb-cccc");
        }
        return respond(request);
      });

      await client.upload("accounts", "{AAAA-BBBB-CCCC}", "field", fileData, "file.txt");
      expect.assertions(1);
    });
  });

  describe("download", () => {
    it("should download file", async () => {
      const fileContent = Buffer.from("test file content");

      vi.mocked(mockAdapter.send).mockResolvedValue({
        ok: true,
        arrayBuffer: () => Promise.resolve(fileContent.buffer),
        blob: () => Promise.resolve(new Blob([fileContent])),
      } as Response);

      const result = await client.download("accounts", "guid-123", "new_logo");

      expect(result).toBeDefined();
      expect(mockAdapter.send).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: expect.stringContaining("/new_logo/$value"),
        })
      );
    });

    it("should throw error if download fails", async () => {
      vi.mocked(mockAdapter.send).mockResolvedValue(
        new Response(JSON.stringify({ error: { code: "0x80040217", message: "No file" } }), {
          status: 404,
        })
      );

      await expect(client.download("accounts", "bad-id", "field")).rejects.toMatchObject({
        status: 404,
        code: "0x80040217",
        message: "No file",
      });
    });
  });

  describe("delete", () => {
    it("should delete file with DELETE on the column", async () => {
      vi.mocked(mockAdapter.send).mockResolvedValue({
        ok: true,
        status: 204,
      } as Response);

      await client.delete("accounts", "guid-123", "new_logo");

      expect(mockAdapter.send).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "DELETE",
          url: "https://org.crm.dynamics.com/api/data/v9.2/accounts(guid-123)/new_logo",
        })
      );
    });
  });

  describe("chunking logic", () => {
    it("should generate correct number of chunks for file size", async () => {
      const fileData = new Uint8Array(10 * 1024 + 1).fill(97); // 10 KB + 1 byte

      let uploadCount = 0;
      const respond = fileResponses("token");
      vi.mocked(mockAdapter.send).mockImplementation((request) => {
        if (request.url.includes("UploadBlock")) {
          uploadCount++;
        }
        return respond(request);
      });

      await client.upload("accounts", "guid", "field", fileData, "file.dat", {
        chunkSize: 1024,
      });

      // ceil((10 KB + 1) / 1 KB) = 11 chunks
      expect(uploadCount).toBe(11);
    });

    it("splits at 4 MB by default (#217: one chunk boundary, not 10 MB of data)", async () => {
      const fileData = new Uint8Array(4 * 1024 * 1024 + 1).fill(97); // 4 MB + 1 byte

      const blockSizes: number[] = [];
      const respond = fileResponses("token");
      vi.mocked(mockAdapter.send).mockImplementation((request) => {
        if (request.url.includes("UploadBlock")) {
          const body = request.body as { BlockData: string };
          blockSizes.push(atob(body.BlockData).length);
        }
        return respond(request);
      });

      await client.upload("accounts", "guid", "field", fileData, "file.dat");

      expect(blockSizes).toEqual([4 * 1024 * 1024, 1]);
    });
  });
});
