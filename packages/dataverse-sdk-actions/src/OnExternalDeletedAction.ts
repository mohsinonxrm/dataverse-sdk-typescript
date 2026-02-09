import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

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
  constructor(public readonly target: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnExternalDeleted`;

    const body: Record<string, unknown> = {
      Target: this.target,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<OnExternalDeletedResponse> {
    // No return value (204 No Content)
    return {};
  }
}
