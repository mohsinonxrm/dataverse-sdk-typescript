import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the InitializeAnnotationBlocksUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InitializeAnnotationBlocksUploadResponse {
  "@odata.context"?: string;
  FileContinuationToken: string;
}

/**
 * Parameters of the InitializeAnnotationBlocksUpload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeAnnotationBlocksUploadActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * InitializeAnnotationBlocksUpload action
 *
 * Unbound action
 */
export class InitializeAnnotationBlocksUploadAction implements Executable<InitializeAnnotationBlocksUploadResponse> {
  constructor(public readonly parameters: InitializeAnnotationBlocksUploadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAnnotationBlocksUpload`;

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

  async parseResponse(response: Response): Promise<InitializeAnnotationBlocksUploadResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as InitializeAnnotationBlocksUploadResponse;
  }
}
