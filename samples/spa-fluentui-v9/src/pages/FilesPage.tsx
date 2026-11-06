import { useEffect, useRef, useState } from "react";
import {
  Body1,
  Button,
  Caption1,
  Field,
  Input,
  Link,
  makeStyles,
  ProgressBar,
  SpinButton,
  tokens,
} from "@fluentui/react-components";
import { DocumentArrowUp20Regular } from "@fluentui/react-icons";
import type { UploadProgress } from "@mohsinonxrm/dataverse-sdk-files";
import { Scenario } from "../components/Scenario";
import { ScenarioPage } from "../components/ScenarioPage";
import { spinValue } from "../lib/fields";
import { snippet } from "../lib/snippet";
import * as files from "../scenarios/files";
import source from "../scenarios/files.ts?raw";

const useStyles = makeStyles({
  picker: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  hidden: { display: "none" },
  preview: {
    display: "block",
    maxWidth: "min(100%, 16rem)",
    borderRadius: tokens.borderRadiusMedium,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  result: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    alignItems: "flex-start",
  },
  muted: { color: tokens.colorNeutralForeground3 },
});

/** A colourful PNG to upload when no file is chosen: noise, so it is big enough for several blocks. */
async function sampleImage(): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = 240;
  canvas.height = 240;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser can't draw the sample image.");
  const image = context.createImageData(canvas.width, canvas.height);
  for (let i = 0; i < image.data.length; i += 4) {
    const x = (i / 4) % canvas.width;
    image.data[i] = (x * 255) / canvas.width;
    image.data[i + 1] = Math.random() * 255;
    image.data[i + 2] = 200;
    image.data[i + 3] = 255;
  }
  context.putImageData(image, 0, 0);
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))),
      "image/png"
    )
  );
}

function Downloaded({ blob }: { blob: Blob }) {
  const styles = useStyles();
  const [url, setUrl] = useState("");
  useEffect(() => {
    const objectUrl = URL.createObjectURL(blob);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [blob]);
  return (
    <div className={styles.result}>
      <Body1>
        {blob.size.toLocaleString()} bytes, {blob.type || "no content type"}.
      </Body1>
      {url && blob.type.startsWith("image/") && (
        <img className={styles.preview} src={url} alt="The downloaded image" />
      )}
      {url && (
        <Link href={url} download="download">
          Save the file
        </Link>
      )}
    </div>
  );
}

export default function FilesPage() {
  const styles = useStyles();
  const [entitySetName, setEntitySetName] = useState("accounts");
  const [recordId, setRecordId] = useState("");
  const [column, setColumn] = useState("entityimage");
  const [file, setFile] = useState<File | null>(null);
  const [chunkSize, setChunkSize] = useState(32 * 1024);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const target = { entitySetName, recordId, column };
  const needsRecord = recordId ? undefined : "Pick a record first, or paste its id.";

  return (
    <ScenarioPage
      title="Files and images"
      description="FileColumnClient uploads to file and image columns in blocks, with progress, and downloads and deletes them. The defaults put a picture on an account's entityimage column, its profile picture."
    >
      <Scenario
        title="Pick a record"
        description="The first account by name. Its id fills in the record of the other scenarios."
        code={snippet(source, "pick-record")}
        run={(sdk, signal) => files.firstAccount(sdk, signal)}
        onResult={(r) => setRecordId(r.id)}
        renderResult={(r) => (
          <>
            {r.name}: {r.id}
          </>
        )}
      />

      <Scenario
        title="Upload with progress"
        description="Choose a file, or upload a generated sample image. A small block size shows the progress block by block."
        code={snippet(source, "upload")}
        run={async (sdk, signal) => {
          setProgress(null);
          const blob = file ?? (await sampleImage());
          const fileName = file?.name ?? "sample.png";
          return files.uploadFile(
            sdk,
            { ...target, file: blob, fileName, chunkSize },
            setProgress,
            signal
          );
        }}
        disabledReason={needsRecord}
        successMessage={(r) => `Uploaded ${r.uploaded}`}
        renderResult={(r) => (
          <>
            {r.uploaded}: {r.bytes.toLocaleString()} bytes.
          </>
        )}
      >
        <Field label="Table (entity set)">
          <Input value={entitySetName} onChange={(_, d) => setEntitySetName(d.value.trim())} />
        </Field>
        <Field label="Record id">
          <Input value={recordId} onChange={(_, d) => setRecordId(d.value.trim())} />
        </Field>
        <Field label="Column" hint="A file or image column.">
          <Input value={column} onChange={(_, d) => setColumn(d.value.trim())} />
        </Field>
        <Field label="Block size (bytes)" hint="Up to 4 MB.">
          <SpinButton
            value={chunkSize}
            min={1024}
            max={4 * 1024 * 1024}
            step={16 * 1024}
            onChange={(_, d) => setChunkSize(spinValue(d, 32 * 1024))}
          />
        </Field>
        <Field label="File">
          <div className={styles.picker}>
            <input
              ref={input}
              className={styles.hidden}
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              aria-label="File to upload"
            />
            <Button icon={<DocumentArrowUp20Regular />} onClick={() => input.current?.click()}>
              Choose a file
            </Button>
            <Caption1 className={styles.muted}>
              {file ? `${file.name} (${file.size.toLocaleString()} bytes)` : "None: a sample image"}
            </Caption1>
          </div>
        </Field>
        {progress && (
          <Field
            label="Progress"
            validationState="none"
            validationMessage={`Block ${progress.chunkIndex + 1} of ${progress.totalChunks}: ${progress.uploaded.toLocaleString()} of ${progress.total.toLocaleString()} bytes`}
          >
            <ProgressBar value={progress.percentage / 100} thickness="large" />
          </Field>
        )}
      </Scenario>

      <Scenario
        title="Download"
        description="The file as a Blob. An image column returns its thumbnail."
        code={snippet(source, "download")}
        run={(sdk) => files.downloadFile(sdk, target)}
        disabledReason={needsRecord}
        renderResult={(blob) => <Downloaded blob={blob} />}
      />

      <Scenario
        title="Delete"
        description="Removes the file from the column. Deleting from an empty column succeeds."
        code={snippet(source, "delete-file")}
        run={(sdk) => files.deleteFile(sdk, target)}
        disabledReason={needsRecord}
        confirm={{
          title: "Delete this file?",
          body: `The ${column} of ${entitySetName}(${recordId}) is deleted permanently.`,
          confirmLabel: "Delete",
        }}
        successMessage={() => "File deleted"}
      />
    </ScenarioPage>
  );
}
