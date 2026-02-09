import { useState, useRef } from "react";
import {
  makeStyles,
  tokens,
  Title3,
  Text,
  Card,
  Button,
  Input,
  Label,
} from "@fluentui/react-components";
import {
  ArrowUploadRegular,
  ArrowDownloadRegular,
  DocumentRegular,
  ImageRegular,
} from "@fluentui/react-icons";
import { useDataverse } from "../../context/DataverseContext";
import { LoadingState } from "../../components/demo/LoadingState";
import { ErrorDisplay } from "../../components/errors/ErrorDisplay";
import { ProgressTracker } from "../../components/demo/ProgressTracker";
import { CodeComparison } from "../../components/demo/CodeComparison";

const useStyles = makeStyles({
  container: {
    padding: "32px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "24px",
  },
  description: {
    color: (tokens as any).colorNeutralForeground2,
    marginTop: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "24px",
    marginTop: "24px",
  },
  card: {
    padding: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "16px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },
  fileInput: {
    display: "none",
  },
  preview: {
    marginTop: "16px",
    maxWidth: "200px",
    maxHeight: "200px",
    border: `1px solid ${(tokens as any).colorNeutralStroke1}`,
    borderRadius: (tokens as any).borderRadiusMedium,
  },
});

const CHUNK_SIZE = 4 * 1024 * 1024; // 4MB chunks

export default function FileOperations() {
  const styles = useStyles();
  const { client, isReady } = useDataverse();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recordId, setRecordId] = useState("");
  const [entityName, setEntityName] = useState("annotation");
  const [columnName, setColumnName] = useState("documentbody");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Download state
  const [downloadRecordId, setDownloadRecordId] = useState("");

  if (!isReady) {
    return <LoadingState label="Initializing Dataverse SDK..." />;
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResults(null);
    }
  };

  const handleChunkedUpload = async () => {
    if (!client || !selectedFile || !recordId) return;
    setLoading(true);
    setError(null);

    try {
      const totalChunks = Math.ceil(selectedFile.size / CHUNK_SIZE);
      setProgress({
        total: totalChunks,
        current: 0,
        successCount: 0,
        errorCount: 0,
        customStats: [
          { label: "File Size", value: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` },
          { label: "Chunk Size", value: "4 MB" },
        ],
      });

      // Step 1: Initialize upload
      const initResponse = await client.api("/InitializeFileBlocksUpload").post({
        Target: {
          "@odata.type": `Microsoft.Dynamics.CRM.${entityName}`,
          [`${entityName}id`]: recordId,
        },
        FileAttributeName: columnName,
        FileName: selectedFile.name,
      });

      const fileContinuationToken = (initResponse as any).FileContinuationToken;

      // Step 2: Upload chunks
      const reader = new FileReader();
      let offset = 0;
      let chunkIndex = 0;

      while (offset < selectedFile.size) {
        const chunk = selectedFile.slice(offset, offset + CHUNK_SIZE);
        const blockId = btoa(`block-${chunkIndex}`);

        // Read chunk as base64
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(",")[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(chunk);
        });

        // Upload chunk
        await client.api("/UploadBlock").post({
          BlockId: blockId,
          BlockData: base64,
          FileContinuationToken: fileContinuationToken,
        });

        chunkIndex++;
        offset += CHUNK_SIZE;

        setProgress((prev: any) => ({
          ...prev,
          current: chunkIndex,
          successCount: chunkIndex,
        }));
      }

      // Step 3: Commit upload
      const blockList = Array.from({ length: totalChunks }, (_, i) => btoa(`block-${i}`));
      await client.api("/CommitFileBlocksUpload").post({
        FileContinuationToken: fileContinuationToken,
        BlockList: blockList,
        FileName: selectedFile.name,
        MimeType: selectedFile.type,
      });

      setResults({
        operation: "Chunked Upload",
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        chunks: totalChunks,
        recordId,
        status: "Success",
      });
    } catch (err) {
      setError(err as Error);
      setProgress((prev: any) => ({ ...prev, errorCount: 1 }));
    } finally {
      setLoading(false);
    }
  };

  const handleSimpleUpload = async () => {
    if (!client || !selectedFile || !recordId) return;
    setLoading(true);
    setError(null);

    try {
      // For small files, use direct upload
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(",")[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      await client.api(`/${entityName}s(${recordId})`).patch({
        [columnName]: base64,
        filename: selectedFile.name,
        mimetype: selectedFile.type,
      });

      setResults({
        operation: "Simple Upload",
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        recordId,
        status: "Success",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!client || !downloadRecordId) return;
    setLoading(true);
    setError(null);

    try {
      // Download file data
      const response = await client.api(`/${entityName}s(${downloadRecordId})`).select().get();

      const base64Data = (response as any)[columnName];
      const fileName = (response as any).filename || "(download as any).bin";
      const mimeType = (response as any).mimetype || "application/octet-stream";

      // Convert base64 to blob and trigger download
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      // Create download link
      const url = (URL as any).createObjectURL(blob);
      const a = (document as any).createElement("a");
      (a as any).href = url;
      (a as any).download = fileName;
      (document as any).body.appendChild(a);
      (a as any).click();
      (document as any).body.removeChild(a);
      (URL as any).revokeObjectURL(url);

      setResults({
        operation: "Download",
        fileName,
        fileSize: (blob as any).size,
        mimeType,
        status: "Success",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={(styles as any).container}>
      <div className={(styles as any).header}>
        <Title3>File Operations</Title3>
        <Text className={(styles as any).description}>
          Upload and download files with chunked transfer for large files (4MB chunks)
        </Text>
      </div>

      <div className={(styles as any).grid}>
        <Card className={(styles as any).card}>
          <Title3>Chunked Upload</Title3>
          <Text>For large files (&gt;4MB) - uses InitializeFileBlocksUpload action</Text>

          <div className={(styles as any).form}>
            <div>
              <Label>Entity Name</Label>
              <Input
                value={entityName}
                onChange={(_e, data) => setEntityName((data as any).value)}
                placeholder="annotation"
              />
            </div>
            <div>
              <Label>Record ID</Label>
              <Input
                value={recordId}
                onChange={(_e, data) => setRecordId((data as any).value)}
                placeholder="GUID of record"
              />
            </div>
            <div>
              <Label>Column Name</Label>
              <Input
                value={columnName}
                onChange={(_e, data) => setColumnName((data as any).value)}
                placeholder="documentbody"
              />
            </div>
            <div>
              <Label>Select File</Label>
              <input
                ref={fileInputRef}
                type="file"
                className={(styles as any).fileInput}
                onChange={handleFileSelect}
              />
              <Button
                icon={<DocumentRegular />}
                onClick={() => (fileInputRef as any).current?.click()}
              >
                Choose File
              </Button>
              {selectedFile && (
                <Text size={200} style={{ marginTop: "8px" }}>
                  Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                  MB)
                </Text>
              )}
            </div>
          </div>

          <div className={(styles as any).actions}>
            <Button
              appearance="primary"
              icon={<ArrowUploadRegular />}
              onClick={handleChunkedUpload}
              disabled={loading || !selectedFile || !recordId}
            >
              Upload (Chunked)
            </Button>
            <Button
              icon={<ArrowUploadRegular />}
              onClick={handleSimpleUpload}
              disabled={loading || !selectedFile || !recordId}
            >
              Upload (Simple)
            </Button>
          </div>
        </Card>

        <Card className={(styles as any).card}>
          <Title3>Download File</Title3>
          <Text>Download file from a file/image column</Text>

          <div className={(styles as any).form}>
            <div>
              <Label>Record ID</Label>
              <Input
                value={downloadRecordId}
                onChange={(_e, data) => setDownloadRecordId((data as any).value)}
                placeholder="GUID of record with file"
              />
            </div>
            <Text size={200}>Uses same entity and column settings from upload section</Text>
          </div>

          <div className={(styles as any).actions}>
            <Button
              appearance="primary"
              icon={<ArrowDownloadRegular />}
              onClick={handleDownload}
              disabled={loading || !downloadRecordId}
            >
              Download File
            </Button>
          </div>
        </Card>

        <Card className={(styles as any).card}>
          <Title3>Image Column</Title3>
          <Text>Upload images to entityimage column</Text>

          <div className={(styles as any).form}>
            <Text size={200}>
              Same operations work for image columns. Set columnName to 'entityimage' for profile
              pictures.
            </Text>
          </div>

          <Button
            icon={<ImageRegular />}
            onClick={() => {
              setEntityName("contact");
              setColumnName("entityimage");
            }}
          >
            Set for Contact Profile Picture
          </Button>
        </Card>
      </div>

      {loading && progress && (
        <ProgressTracker
          total={(progress as any).total}
          current={(progress as any).current}
          label="Uploading file chunks..."
          successCount={(progress as any).successCount}
          errorCount={(progress as any).errorCount}
          customStats={(progress as any).customStats}
        />
      )}

      {error && <ErrorDisplay error={error} onDismiss={() => setError(null)} />}

      {results && (
        <CodeComparison
          items={[
            {
              label: "Operation Result",
              code:
                (results as any).operation === "Chunked Upload"
                  ? `// 1. Initialize
const init = await client.api('/InitializeFileBlocksUpload').post({...});

// 2. Upload chunks (${(results as any).chunks} chunks)
for (const chunk of chunks) {
  await client.api('/UploadBlock').post({
    BlockId: blockId,
    BlockData: base64Chunk,
    FileContinuationToken: token
  });
}

// 3. Commit
await client.api('/CommitFileBlocksUpload').post({
  FileContinuationToken: token,
  BlockList: blockIds
});`
                  : (results as any).operation === "Simple Upload"
                    ? `await client.api('/${entityName}s(${recordId})').patch({
  ${columnName}: base64Data,
  filename: '${(results as any).fileName}',
  mimetype: '${(results as any).mimeType}'
})`
                    : `const file = await client.api('/${entityName}s(${downloadRecordId})')
  .select()
  .get();`,
              result: (JSON as any).stringify(results, null, 2),
            },
          ]}
        />
      )}
    </div>
  );
}
