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
- ✅ **Download support**: Retrieve file content as Blob (browser) or Buffer (Node.js)
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

const fileClient = new FileColumnClient(
  client.requestAdapter,
  'https://your-org.crm.dynamics.com/api/data/v9.2'
);

// Upload file to account logo (image column)
const accountId = 'aaaa-bbbb-cccc-dddd';
const logoFile = /* File or Blob from input */;

await fileClient.upload(
  'accounts',      // Entity set name
  accountId,       // Record ID
  'new_logo',      // Column logical name
  logoFile,        // File data (Blob or Buffer)
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
// Files >128MB are automatically chunked
const largeFile = /* 500MB file */;

await fileClient.upload(
  'emails',
  emailId,
  'new_attachment',
  largeFile,
  'large-document.pdf',
  {
    chunkSize: 8 * 1024 * 1024, // Use 8MB chunks for large files
    onProgress: (progress) => {
      // Update UI progress bar
      updateProgressBar(progress.percentage);
    }
  }
);
```

### Download File

```typescript
// Download file from column
const file = await fileClient.download("accounts", accountId, "new_logo");

// In browser: file is Blob
if (file instanceof Blob) {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "logo.png";
  link.click();
  URL.revokeObjectURL(url);
}

// In Node.js: file is Buffer
else {
  const fs = require("fs");
  fs.writeFileSync("downloaded-logo.png", file);
}
```

### Delete File

```typescript
// Remove file from column
await fileClient.delete("accounts", accountId, "new_logo");
```

## Chunking Strategy

The `FileColumnClient` uses a three-step chunked upload process based on Microsoft's Web API actions:

1. **Initialize**: `InitializeFileBlocksUpload` action creates upload session
2. **Upload blocks**: `UploadBlock` action uploads each chunk sequentially
3. **Commit**: `CommitFileBlocksUpload` action finalizes the upload

### Default Chunk Size

- **Default**: 4MB (4 _ 1024 _ 1024 bytes)
- **Configurable**: Specify `chunkSize` option to customize
- **Recommendation**: Use larger chunks (8-16MB) for very large files to reduce API calls

### Block ID Generation

Block IDs are automatically generated as base64-encoded sequential numbers:

- Block 0: `"MDAwMDAwMDA="` (base64 of "00000000")
- Block 1: `"MDAwMDAwMDE="` (base64 of "00000001")
- Block 2: `"MDAwMDAwMDI="` (base64 of "00000002")

This ensures proper ordering when committing the upload.

## Error Handling

```typescript
try {
  await fileClient.upload("accounts", accountId, "new_logo", logoFile, "logo.png", {
    onProgress: (progress) => {
      console.log(`Progress: ${progress.percentage}%`);
    },
  });
  console.log("Upload successful!");
} catch (error) {
  if (error instanceof DataverseODataError) {
    console.error("Dataverse error:", error.message);
    console.error("Error code:", error.code);
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

  const fileClient = new FileColumnClient(
    client.requestAdapter,
    'https://your-org.crm.dynamics.com/api/data/v9.2'
  );

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
new FileColumnClient(adapter: RequestAdapter, baseUrl: string)
```

- `adapter`: Request adapter from DataverseClient
- `baseUrl`: Base URL for Web API (e.g., `https://org.crm.dynamics.com/api/data/v9.2`)

#### Methods

##### `upload()`

```typescript
async upload(
  entitySetName: string,
  recordId: string,
  columnName: string,
  file: Blob | Buffer,
  fileName: string,
  options?: FileUploadOptions
): Promise<void>
```

Upload a file to a file or image column.

**Parameters:**

- `entitySetName`: Entity set name (e.g., `'accounts'`, `'contacts'`)
- `recordId`: Record GUID (with or without braces)
- `columnName`: Logical name of file/image column
- `file`: File data (Blob in browser, Buffer in Node.js)
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
): Promise<Blob | Buffer>
```

Download a file from a file or image column.

**Parameters:**

- `entitySetName`: Entity set name
- `recordId`: Record GUID
- `columnName`: Logical name of file/image column
- `options`: Download options (optional)

**Returns:** File data as Blob (browser) or Buffer (Node.js).

##### `delete()`

```typescript
async delete(
  entitySetName: string,
  recordId: string,
  columnName: string
): Promise<void>
```

Delete a file from a file or image column.

**Parameters:**

- `entitySetName`: Entity set name
- `recordId`: Record GUID
- `columnName`: Logical name of file/image column

**Returns:** Promise that resolves when deletion completes.

### FileUploadOptions

```typescript
interface FileUploadOptions {
  chunkSize?: number; // Chunk size in bytes (default: 4MB)
  onProgress?: (progress: UploadProgress) => void;
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

- **Small files (<10MB)**: Default 4MB chunks work well
- **Medium files (10-100MB)**: Consider 8MB chunks
- **Large files (>100MB)**: Consider 16MB chunks to reduce API call overhead

### Parallel Uploads

**Not supported** - Chunks must be uploaded sequentially to maintain order. Use `$batch` for parallel uploads of multiple files to different records.

### Retry Logic

The underlying `RequestAdapter` handles retry logic for failed requests. Individual chunk uploads will be retried automatically on transient failures (429, 5xx).

## Browser Compatibility

- **Modern browsers**: Full support (Chrome, Firefox, Safari, Edge)
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
