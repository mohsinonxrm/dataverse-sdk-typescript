import { describe, it, expect, vi, beforeEach } from "vitest";
import { FileColumnClient } from "../src/FileColumnClient.js";
import type { RequestAdapter } from "@mohsinonxrm/dataverse-sdk-core";

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

      let callCount = 0;
      // eslint-disable-next-line @typescript-eslint/require-await
      vi.mocked(mockAdapter.send).mockImplementation(async () => {
        callCount++;
        if (callCount === 1) {
          return {
            ok: true,
            json: () => Promise.resolve({ FileContinuationToken: "token-123" }),
          } as Response;
        }
        return { ok: true, status: 204 } as Response;
      });

      await client.upload("accounts", "guid-123", "new_logo", fileData, "logo.png");

      // 1 init + 1 upload + 1 commit = 3 calls
      expect(mockAdapter.send).toHaveBeenCalledTimes(3);
    });

    it("should upload large file in multiple chunks", async () => {
      const fileData = Buffer.from("a".repeat(10 * 1024 * 1024)); // 10MB = 3 chunks at 4MB

      let callCount = 0;
      // eslint-disable-next-line @typescript-eslint/require-await
      vi.mocked(mockAdapter.send).mockImplementation(async () => {
        callCount++;
        if (callCount === 1) {
          return {
            ok: true,
            json: () => Promise.resolve({ FileContinuationToken: "token-456" }),
          } as Response;
        }
        return { ok: true, status: 204 } as Response;
      });

      await client.upload("accounts", "guid-456", "new_document", fileData, "large.pdf");

      // 1 init + 3 uploads + 1 commit = 5 calls
      expect(mockAdapter.send).toHaveBeenCalledTimes(5);
    });

    it("should report progress during upload", async () => {
      const fileData = Buffer.from("a".repeat(8 * 1024 * 1024)); // 8MB = 2 chunks

      let callCount = 0;
      // eslint-disable-next-line @typescript-eslint/require-await
      vi.mocked(mockAdapter.send).mockImplementation(async () => {
        callCount++;
        if (callCount === 1) {
          return {
            ok: true,
            json: () => Promise.resolve({ FileContinuationToken: "token-789" }),
          } as Response;
        }
        return { ok: true, status: 204 } as Response;
      });

      const progressUpdates: number[] = [];
      await client.upload("accounts", "guid-789", "new_file", fileData, "medium.pdf", {
        onProgress: (progress) => {
          progressUpdates.push(progress.percentage);
        },
      });

      expect(progressUpdates).toEqual([50, 100]);
    });

    it("should normalize GUID format", async () => {
      const fileData = Buffer.from("small");

      // eslint-disable-next-line @typescript-eslint/require-await
      vi.mocked(mockAdapter.send).mockImplementation(async (request) => {
        if (request.url.includes("InitializeFileBlocksUpload")) {
          // Check that GUID is normalized in body (no braces, lowercase)

          expect((request.body as { Target: { id: string } }).Target.id).toBe("aaaa-bbbb-cccc");
          return {
            ok: true,
            json: () => Promise.resolve({ FileContinuationToken: "token" }),
          } as Response;
        }
        return { ok: true, status: 204 } as Response;
      });

      await client.upload("accounts", "{AAAA-BBBB-CCCC}", "field", fileData, "file.txt");
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
      vi.mocked(mockAdapter.send).mockResolvedValue({
        ok: false,
        statusText: "Not Found",
      } as Response);

      await expect(client.download("accounts", "bad-id", "field")).rejects.toThrow(
        "Failed to download file: Not Found"
      );
    });
  });

  describe("delete", () => {
    it("should delete file by setting column to null", async () => {
      vi.mocked(mockAdapter.send).mockResolvedValue({
        ok: true,
        status: 204,
      } as Response);

      await client.delete("accounts", "guid-123", "new_logo");

      expect(mockAdapter.send).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "PATCH",
          body: {
            new_logo: null,
          },
        })
      );
    });
  });

  describe("chunking logic", () => {
    it("should generate correct number of chunks for file size", async () => {
      const fileData = Buffer.from("a".repeat(10 * 1024 * 1024)); // 10MB

      let uploadCount = 0;
      // eslint-disable-next-line @typescript-eslint/require-await
      vi.mocked(mockAdapter.send).mockImplementation(async (request) => {
        if (request.url.includes("UploadBlock")) {
          uploadCount++;
        }
        if (request.url.includes("InitializeFileBlocksUpload")) {
          return {
            ok: true,
            json: () => Promise.resolve({ FileContinuationToken: "token" }),
          } as Response;
        }
        return { ok: true, status: 204 } as Response;
      });

      await client.upload("accounts", "guid", "field", fileData, "file.dat");

      // 10MB / 4MB per chunk = 3 chunks
      expect(uploadCount).toBe(3);
    });
  });
});
