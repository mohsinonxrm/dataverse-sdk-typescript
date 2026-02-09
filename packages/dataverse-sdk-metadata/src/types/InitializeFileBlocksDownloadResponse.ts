/**
 * InitializeFileBlocksDownloadResponse
 */
export interface InitializeFileBlocksDownloadResponse {
  FileSizeInBytes?: number;
  FileName?: string;
  FileContinuationToken?: string;
  IsChunkingSupported?: boolean;
}
