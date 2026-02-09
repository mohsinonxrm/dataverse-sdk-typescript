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

   const fileClient = new FileColumnClient(client.requestAdapter);

   await fileClient.upload(
     "accounts", // entitySetName
     accountId, // recordId
     "new_logo", // columnName
     logoFile, // Blob | Buffer
     {
       chunkSize: 4 * 1024 * 1024, // 4MB
       onProgress: (uploaded, total) => console.log(`${uploaded}/${total}`),
     }
   );

   const file = await fileClient.download("accounts", accountId, "new_logo");
   ```

5. **Stream-based approach:** Defer to v1.1+ as alternative implementation for smaller files or specific scenarios.

6. **Package dependencies:**
   - Depends on `dataverse-sdk-core` (RequestAdapter, middleware)
   - Depends on `dataverse-sdk-actions` (typed action wrappers)

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
