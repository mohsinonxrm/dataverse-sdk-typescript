import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from OnExternalDeleted action
 */
export interface OnExternalDeletedResponse {
  // No content returned
}

/**
 * OnExternalDeleted action
 *
 * Unbound action
 */
export class OnExternalDeletedAction implements Executable<OnExternalDeletedResponse> {
  constructor(public readonly target: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnExternalDeleted`;

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

  async parseResponse(response: Response): Promise<OnExternalDeletedResponse> {
    // No return value (204 No Content)
    return {};
  }
}
