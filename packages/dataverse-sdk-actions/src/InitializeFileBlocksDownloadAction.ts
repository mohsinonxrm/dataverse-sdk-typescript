import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the InitializeFileBlocksDownload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InitializeFileBlocksDownloadResponse {
  "@odata.context"?: string;
  FileContinuationToken: string;
  FileName: string;
  FileSizeInBytes: number;
  IsChunkingSupported: boolean;
}

/**
 * Parameters of the InitializeFileBlocksDownload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeFileBlocksDownloadActionParameters {
  Target: EntityReference | AnyEntityPayload;
  FileAttributeName: string;
  DataSource?: string;
}

/**
 * InitializeFileBlocksDownload action
 *
 * Unbound action
 */
export class InitializeFileBlocksDownloadAction implements Executable<InitializeFileBlocksDownloadResponse> {
  constructor(public readonly parameters: InitializeFileBlocksDownloadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeFileBlocksDownload`;

    const body = requestBody({
      Target: this.parameters.Target,
      FileAttributeName: this.parameters.FileAttributeName,
      DataSource: this.parameters.DataSource,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<InitializeFileBlocksDownloadResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as InitializeFileBlocksDownloadResponse;
  }
}
