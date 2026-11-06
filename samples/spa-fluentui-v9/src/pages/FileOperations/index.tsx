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
import { FileColumnClient } from "@mohsinonxrm/dataverse-sdk-files";
import { useDataverse } from "../../context/DataverseContext";
import { LoadingState } from "../../components/demo/LoadingState";
import { ErrorDisplay } from "../../components/errors/ErrorDisplay";
import { ProgressTracker } from "../../components/demo/ProgressTracker";
import { CodeComparison } from "../../components/demo/CodeComparison";
import { patchProgress, type ResultView, type ProgressState } from "../../types/common";

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
    color: tokens.colorNeutralForeground2,
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
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
});

const CHUNK_SIZE = 4 * 1024 * 1024; // 4MB chunks

export default function FileOperations() {
  const styles = useStyles();
  const { client, isReady } = useDataverse();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<ResultView | null>(null);
  const [progress, setProgress] = useState<ProgressState | null>(null);

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recordId, setRecordId] = useState("");
  const [entitySetName, setEntitySetName] = useState("contacts");
  const [columnName, setColumnName] = useState("entityimage");
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
      const files = new FileColumnClient(client);
      const totalChunks = Math.max(1, Math.ceil(selectedFile.size / CHUNK_SIZE));
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

      // upload() initializes the upload, sends the blocks and commits them
      await files.upload(entitySetName, recordId, columnName, selectedFile, selectedFile.name, {
        chunkSize: CHUNK_SIZE,
        onProgress: ({ chunkIndex }) => {
          setProgress(patchProgress({ current: chunkIndex + 1, successCount: chunkIndex + 1 }));
        },
      });

      setResults({
        operation: "Upload",
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        chunks: totalChunks,
        recordId,
        status: "Success",
      });
    } catch (err) {
      setError(err as Error);
      setProgress(patchProgress({ errorCount: 1 }));
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!client || !downloadRecordId) return;
    setLoading(true);
    setError(null);

    try {
      const files = new FileColumnClient(client);
      // download() resolves to a Blob
      const blob = await files.download(entitySetName, downloadRecordId, columnName);
      const fileName = `${columnName}-${downloadRecordId}`;

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setResults({
        operation: "Download",
        fileName,
        fileSize: blob.size,
        mimeType: blob.type,
        status: "Success",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title3>File Operations</Title3>
        <Text className={styles.description}>
          Upload and download files with chunked transfer for large files (4MB chunks)
        </Text>
      </div>

      <div className={styles.grid}>
        <Card className={styles.card}>
          <Title3>Chunked Upload</Title3>
          <Text>
            For large files (&gt;4MB) - uses FileColumnClient (InitializeFileBlocksUpload,
            UploadBlock, CommitFileBlocksUpload)
          </Text>

          <div className={styles.form}>
            <div>
              <Label>Entity Set Name</Label>
              <Input
                value={entitySetName}
                onChange={(_e, data) => setEntitySetName(data.value)}
                placeholder="contacts"
              />
            </div>
            <div>
              <Label>Record ID</Label>
              <Input
                value={recordId}
                onChange={(_e, data) => setRecordId(data.value)}
                placeholder="GUID of record"
              />
            </div>
            <div>
              <Label>Column Name</Label>
              <Input
                value={columnName}
                onChange={(_e, data) => setColumnName(data.value)}
                placeholder="entityimage"
              />
            </div>
            <div>
              <Label>Select File</Label>
              <input
                ref={fileInputRef}
                type="file"
                className={styles.fileInput}
                onChange={handleFileSelect}
              />
              <Button icon={<DocumentRegular />} onClick={() => fileInputRef.current?.click()}>
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

          <div className={styles.actions}>
            <Button
              appearance="primary"
              icon={<ArrowUploadRegular />}
              onClick={handleChunkedUpload}
              disabled={loading || !selectedFile || !recordId}
            >
              Upload (Chunked)
            </Button>
          </div>
        </Card>

        <Card className={styles.card}>
          <Title3>Download File</Title3>
          <Text>Download file from a file/image column</Text>

          <div className={styles.form}>
            <div>
              <Label>Record ID</Label>
              <Input
                value={downloadRecordId}
                onChange={(_e, data) => setDownloadRecordId(data.value)}
                placeholder="GUID of record with file"
              />
            </div>
            <Text size={200}>Uses same entity and column settings from upload section</Text>
          </div>

          <div className={styles.actions}>
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

        <Card className={styles.card}>
          <Title3>Image Column</Title3>
          <Text>Upload images to entityimage column</Text>

          <div className={styles.form}>
            <Text size={200}>
              Same operations work for image columns. Set columnName to 'entityimage' for profile
              pictures.
            </Text>
          </div>

          <Button
            icon={<ImageRegular />}
            onClick={() => {
              setEntitySetName("contacts");
              setColumnName("entityimage");
            }}
          >
            Set for Contact Profile Picture
          </Button>
        </Card>
      </div>

      {loading && progress && (
        <ProgressTracker
          total={progress.total}
          current={progress.current}
          label="Uploading file chunks..."
          successCount={progress.successCount}
          errorCount={progress.errorCount}
          customStats={progress.customStats}
        />
      )}

      {error && <ErrorDisplay error={error} onDismiss={() => setError(null)} />}

      {results && (
        <CodeComparison
          items={[
            {
              label: "Operation Result",
              code:
                results.operation === "Upload"
                  ? `const files = new FileColumnClient(client);
await files.upload('${entitySetName}', '${recordId}', '${columnName}', file, '${String(results.fileName)}', {
  onProgress: ({ percentage }) => console.log(percentage + '%')
});`
                  : `const files = new FileColumnClient(client);
const blob = await files.download('${entitySetName}', '${downloadRecordId}', '${columnName}');`,
              result: JSON.stringify(results, null, 2),
            },
          ]}
        />
      )}
    </div>
  );
}
