/**
 * InitializeFileBlocksDownloadResponse
 */
export interface InitializeFileBlocksDownloadResponse {
  FileContinuationToken?: string;
  FileName?: string;
  FileSizeInBytes?: number;
  IsChunkingSupported?: boolean;
}
