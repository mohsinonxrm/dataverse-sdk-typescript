import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the InitializeAnnotationBlocksDownload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InitializeAnnotationBlocksDownloadResponse {
  "@odata.context"?: string;
  FileContinuationToken: string;
  FileName: string;
  FileSizeInBytes: number;
}

/**
 * Parameters of the InitializeAnnotationBlocksDownload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeAnnotationBlocksDownloadActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * InitializeAnnotationBlocksDownload action
 *
 * Unbound action
 */
export class InitializeAnnotationBlocksDownloadAction implements Executable<InitializeAnnotationBlocksDownloadResponse> {
  constructor(public readonly parameters: InitializeAnnotationBlocksDownloadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAnnotationBlocksDownload`;

    const body = requestBody({
      Target: this.parameters.Target,
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

  async parseResponse(response: Response): Promise<InitializeAnnotationBlocksDownloadResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as InitializeAnnotationBlocksDownloadResponse;
  }
}
