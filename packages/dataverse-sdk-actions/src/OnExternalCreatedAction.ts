import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from OnExternalCreated action
 */
export interface OnExternalCreatedResponse {
  // No content returned
}

/**
 * OnExternalCreated action
 *
 * Unbound action
 */
export class OnExternalCreatedAction implements Executable<OnExternalCreatedResponse> {
  constructor(public readonly target: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnExternalCreated`;

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

  async parseResponse(response: Response): Promise<OnExternalCreatedResponse> {
    // No return value (204 No Content)
    return {};
  }
}
