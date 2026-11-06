import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the InitializeAttachmentBlocksUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InitializeAttachmentBlocksUploadResponse {
  "@odata.context"?: string;
  FileContinuationToken: string;
}

/**
 * Parameters of the InitializeAttachmentBlocksUpload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeAttachmentBlocksUploadActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * InitializeAttachmentBlocksUpload action
 *
 * Unbound action
 */
export class InitializeAttachmentBlocksUploadAction implements Executable<InitializeAttachmentBlocksUploadResponse> {
  constructor(public readonly parameters: InitializeAttachmentBlocksUploadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAttachmentBlocksUpload`;

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

  async parseResponse(response: Response): Promise<InitializeAttachmentBlocksUploadResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as InitializeAttachmentBlocksUploadResponse;
  }
}
