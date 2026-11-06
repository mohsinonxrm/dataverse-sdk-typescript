import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from InitializeAttachmentBlocksUpload action
 */
export interface InitializeAttachmentBlocksUploadResponse {
  FileContinuationToken: string;
}

/**
 * InitializeAttachmentBlocksUpload action
 *
 * Unbound action
 */
export class InitializeAttachmentBlocksUploadAction implements Executable<InitializeAttachmentBlocksUploadResponse> {
  constructor(public readonly target: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAttachmentBlocksUpload`;

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

  async parseResponse(response: Response): Promise<InitializeAttachmentBlocksUploadResponse> {
    const data = await response.json();
    return data as InitializeAttachmentBlocksUploadResponse;
  }
}
