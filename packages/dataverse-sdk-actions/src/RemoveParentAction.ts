import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from RemoveParent action
 */
export interface RemoveParentResponse {
  // No content returned
}

/**
 * RemoveParent action
 *
 * Unbound action
 */
export class RemoveParentAction implements Executable<RemoveParentResponse> {
  constructor(public readonly target: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveParent`;

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

  async parseResponse(response: Response): Promise<RemoveParentResponse> {
    // No return value (204 No Content)
    return {};
  }
}
