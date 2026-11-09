## ADR 0005 — File & Image Column Operations

**File:** `docs/adr/0005-file-image-operations.md`  
**Status:** Accepted  
**Date:** 2026-01-25  
**Decision Owners:** SDK maintainers

### Context

Dataverse supports file and image columns (FileAttributeMetadata and ImageAttributeMetadata) that can store binary data. Microsoft provides two approaches for uploading/downloading file column data:

1. **Actions-based approach**: Uses `InitializeFileBlocksUpload`, `UploadBlock`, and `CommitFileBlocksUpload` actions for chunked uploads
2. **Stream-based approach**: Direct PATCH with `Content-Range` headers for streaming

Files larger than 128MB should use chunked uploads for reliability. File columns are increasingly common for document management, profile pictures, and attachment scenarios.

The metadata package (Phase 6) will include strict typing for FileAttributeMetadata and ImageAttributeMetadata, requiring our SDK to provide first-class support for file operations.

### Decision

1. **Separate package:** Create `@mohsinonxrm/dataverse-sdk-files` as a dedicated package for file/image column operations, included in v1.0.

2. **Actions-based approach for v1.0:** Implement chunked upload/download using Web API actions:
   - `InitializeFileBlocksUpload` — Initializes upload session, returns upload token and block size
   - `UploadBlock` — Uploads individual blocks with block ID
   - `CommitFileBlocksUpload` — Finalizes upload with block list
   - Corresponding download actions

3. **Chunking strategy:**
   - Default chunk size: 4MB (configurable)
   - Automatic chunking for files >4MB
   - Progress callback support (optional)
   - Resume capability via block tracking

4. **API surface:**

   ```typescript
   import { FileColumnClient } from "@mohsinonxrm/dataverse-sdk-files";

   // Requests go through client.send(), so the client's pipeline (auth, retry, logging) applies.
   // new FileColumnClient(adapter, baseUrl) takes any object with send(request) instead.
   const fileClient = new FileColumnClient(client);

   await fileClient.upload(
     "accounts", // entitySetName
     accountId, // recordId
     "new_logo", // columnName
     logoFile, // file content
     "logo.png", // fileName
     {
       chunkSize: 4 * 1024 * 1024, // 4MB
       onProgress: (progress) => console.log(`${progress.uploaded}/${progress.total}`),
     }
   );

   const file = await fileClient.download("accounts", accountId, "new_logo"); // a Blob
   ```

5. **Stream-based approach:** Defer to v1.1+ as alternative implementation for smaller files or specific scenarios.

6. **Package dependencies:**
   - Depends on `dataverse-sdk-core` (`RequestAdapter`; `DataverseClient` satisfies it through `send()`)
   - Depends on `dataverse-sdk-actions` (typed action wrappers)

### Status update (2026-11-07, 2.0.0)

- **Stream-based approach (decision 5) is implemented** (#95). `upload()` takes `method: "actions"` (the default), `"patch-chunked"` (PATCH with `Content-Range`) or `"single"`, and a `ReadableStream` as the file. `download()` takes `method: "single"` (the default), `"range"` or `"actions"`, and `downloadStream()` returns a `ReadableStream`.
- **Chunking (decision 3).** Dataverse rejects blocks above 4 MB, so a larger `chunkSize` is rejected before anything is sent (#61). Resuming an interrupted upload from its blocks is not implemented.
- **Browsers.** Uploads and downloads use `Blob`, `ArrayBuffer` and typed arrays, not Node's `Buffer`, and `download()` returns a `Blob` (#58).

### Consequences

**Pros:**

- First-class file column support in v1.0 (competitive advantage)
- Handles large files reliably via chunking
- Integrates with metadata typing (FileAttributeMetadata/ImageAttributeMetadata)
- Progress tracking enables better UX in applications
- Actions-based approach is well-documented by Microsoft

**Cons:**

- Adds implementation scope to v1.0 (~1 week)
- Additional package to maintain
- Stream-based approach deferred (though less common)

### Alternatives Considered

**Defer to v1.1:** Rejected because metadata typing includes file/image attributes, making this incomplete without upload/download support.

**Stream-based only:** Rejected because chunking is required for large files (>128MB) and actions-based approach handles both small and large files consistently.

**Combine with actions package:** Rejected because file operations have distinct concerns (chunking, progress, resume) warranting separate package.
