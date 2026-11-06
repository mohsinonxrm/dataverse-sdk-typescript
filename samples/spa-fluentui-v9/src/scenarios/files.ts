/**
 * File and image columns with `FileColumnClient`. Each `#region` is shown on the page as the code
 * that runs.
 */
import type { PageResponse } from "@mohsinonxrm/dataverse-sdk-core";
import { FileColumnClient, type UploadProgress } from "@mohsinonxrm/dataverse-sdk-files";
import type { Sdk } from "../sdk/createSdk";
import type { Account } from "./types";

export interface FileTarget {
  entitySetName: string;
  recordId: string;
  column: string;
}

// #region pick-record
export async function firstAccount({ client }: Sdk, signal: AbortSignal) {
  const page = await client
    .api("accounts")
    .select("name")
    .orderBy("name asc")
    .top(1)
    .get<PageResponse<Account>>({ signal });
  const account = page.value[0];
  if (!account) throw new Error("There are no accounts to attach a file to.");
  return { id: account.accountid, name: account.name };
}
// #endregion

// #region upload
export async function uploadFile(
  { client }: Sdk,
  input: FileTarget & { file: Blob; fileName: string; chunkSize: number },
  onProgress: (progress: UploadProgress) => void,
  signal: AbortSignal
) {
  const files = new FileColumnClient(client);
  // Sent in blocks (InitializeFileBlocksUpload, UploadBlock per chunk, CommitFileBlocksUpload);
  // onProgress runs after each block.
  await files.upload(
    input.entitySetName,
    input.recordId,
    input.column,
    input.file,
    input.fileName,
    {
      chunkSize: input.chunkSize,
      onProgress,
      signal,
    }
  );
  return { uploaded: input.fileName, bytes: input.file.size };
}
// #endregion

// #region download
export async function downloadFile({ client }: Sdk, input: FileTarget) {
  const files = new FileColumnClient(client);
  const blob = await files.download(input.entitySetName, input.recordId, input.column);
  return blob; // A Blob: show it with URL.createObjectURL(blob), or save it.
}
// #endregion

// #region delete-file
export async function deleteFile({ client }: Sdk, input: FileTarget) {
  const files = new FileColumnClient(client);
  await files.delete(input.entitySetName, input.recordId, input.column);
  return { deleted: `${input.entitySetName}(${input.recordId})/${input.column}` };
}
// #endregion
