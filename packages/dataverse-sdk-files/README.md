# @mohsinonxrm/dataverse-sdk-files

File and image column operations with chunked upload/download for Dataverse Web API.

## Installation

```bash
npm install @mohsinonxrm/dataverse-sdk-files @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-actions
```

## Features

- ✅ **Chunked uploads**: Handles files of any size with automatic chunking (default 4MB chunks)
- ✅ **Progress tracking**: Real-time upload progress callbacks
- ✅ **File & Image columns**: Supports both FileAttributeMetadata and ImageAttributeMetadata
- ✅ **Download support**: Retrieve file content as a `Blob` (browser and Node.js)
- ✅ **Browser and Node.js**: Takes a `Blob`, `File`, `ArrayBuffer` or typed array; no `Buffer` polyfill needed
- ✅ **TypeScript first**: Fully typed with comprehensive IntelliSense
- ✅ **Actions-based approach**: Uses Microsoft-recommended Web API actions

## Supported Column Types

- **File columns** (`FileAttributeMetadata`): Store documents, attachments, any file type
- **Image columns** (`ImageAttributeMetadata`): Store profile pictures, logos, images

## Usage

### Basic Upload

```typescript
import { DataverseClient } from '@mohsinonxrm/dataverse-sdk-core';
import { FileColumnClient } from '@mohsinonxrm/dataverse-sdk-files';

const client = new DataverseClient({
  baseUrl: 'https://your-org.crm.dynamics.com',
  tokenProvider,
});

// Every request runs through client.send(): auth, retry, logging and telemetry apply.
const fileClient = new FileColumnClient(client);

// Upload file to account logo (image column)
const accountId = 'aaaa-bbbb-cccc-dddd';
const logoFile = /* File or Blob from input */;

await fileClient.upload(
  'accounts',      // Entity set name
  accountId,       // Record ID
  'new_logo',      // Column logical name
  logoFile,        // File data (Blob, File, ArrayBuffer or Uint8Array/Buffer)
  'company-logo.png'  // File name
);
```

### Upload with Progress Tracking

```typescript
await fileClient.upload("accounts", accountId, "new_document", documentFile, "contract.pdf", {
  chunkSize: 4 * 1024 * 1024, // 4MB chunks (default)
  onProgress: (progress) => {
    console.log(`Upload: ${progress.percentage}% complete`);
    console.log(`Chunk ${progress.chunkIndex + 1} of ${progress.totalChunks}`);
    console.log(`${progress.uploaded} / ${progress.total} bytes`);
  },
});
```

### Upload Large File

```typescript
// Every upload is sent in blocks of at most 4MB (the largest block Dataverse accepts),
// so a large file needs no special options. The column's maximum size still applies.
const largeFile = /* 500MB file */;
const controller = new AbortController(); // controller.abort() cancels the upload

await fileClient.upload(
  'emails',
  emailId,
  'new_attachment',
  largeFile,
  'large-document.pdf',
  {
    onProgress: (progress) => {
      // Update UI progress bar
      updateProgressBar(progress.percentage);
    },
    signal: controller.signal,
  }
);
```

### Download File

```typescript
// Download file from column
const file = await fileClient.download("accounts", accountId, "new_logo");

// In a browser: save the Blob
const url = URL.createObjectURL(file);
const link = document.createElement("a");
link.href = url;
link.download = "logo.png";
link.click();
URL.revokeObjectURL(url);

// In Node.js: download() returns a Blob too
import { writeFile } from "node:fs/promises";
await writeFile("downloaded-logo.png", Buffer.from(await file.arrayBuffer()));
```

### Delete File

```typescript
// Remove the file from the column (DELETE /accounts(id)/new_logo).
// Deleting from a column that has no file succeeds.
await fileClient.delete("accounts", accountId, "new_logo");
```

## Chunking Strategy

The `FileColumnClient` uses a three-step chunked upload process based on Microsoft's Web API actions:

1. **Initialize**: `InitializeFileBlocksUpload` action creates upload session. Its `Target` is a typed entity reference, `{ "@odata.type": "Microsoft.Dynamics.CRM.account", "accountid": "…" }`, so the first upload to a table looks up its logical name and primary key from `EntityDefinitions` (once per entity set; the result is reused by every `FileColumnClient` on the same `DataverseClient`)
2. **Upload blocks**: `UploadBlock` action uploads each chunk sequentially
3. **Commit**: `CommitFileBlocksUpload` action finalizes the upload

### Default Chunk Size

- **Default and maximum**: 4MB (`4 * 1024 * 1024` bytes). Dataverse rejects bigger blocks, so `upload()` rejects a larger `chunkSize` with a `DataverseInvalidRequestError` before sending anything.
- **Configurable**: Specify a smaller `chunkSize` for finer-grained progress

### Block ID Generation

Block IDs are automatically generated as base64-encoded sequential numbers:

- Block 0: `"MDAwMDAwMDA="` (base64 of "00000000")
- Block 1: `"MDAwMDAwMDE="` (base64 of "00000001")
- Block 2: `"MDAwMDAwMDI="` (base64 of "00000002")

This ensures proper ordering when committing the upload.

## Error Handling

Every response is checked. When a step fails, `upload()`, `download()` and `delete()` reject with the parsed error (`DataverseODataError`, or `DataverseThrottleError` for a 429), which carries `status`, `code`, `message`, `requestId` and the response headers, and `upload()` sends nothing after the failed request. `download()` of a column with no file rejects with status 404.

```typescript
import { DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";

try {
  await fileClient.upload("accounts", accountId, "new_logo", logoFile, "logo.png", {
    onProgress: (progress) => {
      console.log(`Progress: ${progress.percentage}%`);
    },
  });
  console.log("Upload successful!");
} catch (error) {
  if (error instanceof DataverseODataError) {
    console.error("Dataverse error:", error.status, error.code, error.message);
  } else {
    console.error("Upload failed:", error);
  }
}
```

## React Example with Progress

```typescript
import { useState } from 'react';
import { FileColumnClient } from '@mohsinonxrm/dataverse-sdk-files';

function ProfilePictureUpload({ client, accountId }) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const fileClient = new FileColumnClient(client);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      await fileClient.upload(
        'accounts',
        accountId,
        'new_profilepicture',
        file,
        file.name,
        {
          onProgress: (p) => setProgress(p.percentage)
        }
      );
      alert('Upload complete!');
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={uploading}
        accept="image/*"
      />
      {uploading && (
        <div>
          <progress value={progress} max="100" />
          <span>{progress}%</span>
        </div>
      )}
    </div>
  );
}
```

## API Reference

### FileColumnClient

#### Constructor

```typescript
new FileColumnClient(client: DataverseClient)
new FileColumnClient(adapter: RequestAdapter, baseUrl?: string)
```

- `client`: your `DataverseClient`. Requests go through `client.send()`, so its auth, retry, logging and telemetry apply, and URLs are built on `client.getBaseUrl()`.
- `adapter`: any object with `send(request: RequestInformation): Promise<Response>`. A raw adapter such as `FetchRequestAdapter` adds no auth or retry.
- `baseUrl`: the Web API root, e.g. `https://contoso.crm.dynamics.com/api/data/v9.2`. Optional when the adapter has a `getBaseUrl()` method (a `DataverseClient` does). Without either, the constructor throws a `DataverseInvalidRequestError` (name `MissingParameter`).

#### Methods

##### `upload()`

```typescript
async upload(
  entitySetName: string,
  recordId: string,
  columnName: string,
  file: Blob | ArrayBuffer | ArrayBufferView,
  fileName: string,
  options?: FileUploadOptions
): Promise<void>
```

Upload a file to a file or image column.

**Parameters:**

- `entitySetName`: Entity set name (e.g., `'accounts'`, `'emails'`). The table's logical name and primary key are looked up from it once (see [Chunking Strategy](#chunking-strategy))
- `recordId`: Record GUID (with or without braces)
- `columnName`: Logical name of file/image column
- `file`: File data: a `Blob` or `File`, an `ArrayBuffer`, or a typed-array view such as `Uint8Array` (a Node.js `Buffer` is a `Uint8Array`). A `Blob`'s `type` becomes the file's MIME type; otherwise it is `application/octet-stream`.
- `fileName`: Name of file being uploaded
- `options`: Upload options (optional)

**Returns:** Promise that resolves when upload completes.

##### `download()`

```typescript
async download(
  entitySetName: string,
  recordId: string,
  columnName: string,
  options?: FileDownloadOptions
): Promise<Blob>
```

Download a file from a file or image column.

**Parameters:**

- `entitySetName`: Entity set name
- `recordId`: Record GUID
- `columnName`: Logical name of file/image column
- `options`: Download options (optional)

**Returns:** File data as a `Blob`, in browsers and in Node.js.

##### `delete()`

```typescript
async delete(
  entitySetName: string,
  recordId: string,
  columnName: string
): Promise<void>
```

Delete a file from a file or image column, with `DELETE /{entitySetName}({recordId})/{columnName}`. Deleting from a column that has no file succeeds.

**Parameters:**

- `entitySetName`: Entity set name
- `recordId`: Record GUID
- `columnName`: Logical name of file/image column

**Returns:** Promise that resolves when deletion completes.

### FileUploadOptions

```typescript
interface FileUploadOptions {
  chunkSize?: number; // Chunk size in bytes (default and maximum: 4MB)
  onProgress?: (progress: UploadProgress) => void;
  signal?: AbortSignal; // Cancels the upload; it rejects with DataverseAbortError
}
```

### UploadProgress

```typescript
interface UploadProgress {
  uploaded: number; // Bytes uploaded so far
  total: number; // Total file size in bytes
  percentage: number; // Progress percentage (0-100)
  chunkIndex: number; // Current chunk index (0-based)
  totalChunks: number; // Total number of chunks
}
```

## Performance Considerations

### Chunk Size

- The default 4MB is also the largest block Dataverse accepts, and needs the fewest requests.
- `upload()` reads the whole file into memory before it sends the first block.

### Parallel Uploads

**Not supported** - Chunks must be uploaded sequentially to maintain order. Use `$batch` for parallel uploads of multiple files to different records.

### Retry Logic

When the `FileColumnClient` sends through a `DataverseClient`, the client's retry settings apply to every request: a 429 is retried for any request. A block (`UploadBlock`) is also retried after a 502, 503 or 504 (and after a dropped connection when `retry.retryNetworkErrors` is on), because sending a block again with the same block id replaces it; the client retries other POSTs only after a 429. The number of retries is the client's `retry.maxRetries`. A raw adapter such as `FetchRequestAdapter` doesn't retry.

## Browser Compatibility

- **Modern browsers**: Full support (Chrome, Firefox, Safari, Edge), with no `Buffer` polyfill
- **IE11**: Not supported (no native `fetch`, Blob support limited)

## Node.js Compatibility

- **Node.js 22+**: Full support
- **Older versions**: Not supported (requires native `fetch`)

## License

AGPL-3.0-only

## Related Packages

- [`@mohsinonxrm/dataverse-sdk-core`](../dataverse-sdk-core) - Core SDK with request pipeline
- [`@mohsinonxrm/dataverse-sdk-actions`](../dataverse-sdk-actions) - Typed Web API actions
- [`@mohsinonxrm/dataverse-sdk-metadata`](../dataverse-sdk-metadata) - Metadata operations (includes FileAttributeMetadata typing)
