import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from InitializeAnnotationBlocksUpload action
 */
export interface InitializeAnnotationBlocksUploadResponse {
  FileContinuationToken: string;
}

/**
 * InitializeAnnotationBlocksUpload action
 *
 * Unbound action
 */
export class InitializeAnnotationBlocksUploadAction implements Executable<InitializeAnnotationBlocksUploadResponse> {
  constructor(public readonly target: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAnnotationBlocksUpload`;

    const body: Record<string, unknown> = {
      Target: this.target,
    };

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
    const data = await response.json();
    return data as InitializeAnnotationBlocksUploadResponse;
  }
}
