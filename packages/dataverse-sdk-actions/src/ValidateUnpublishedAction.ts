import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from ValidateUnpublished action
 */
export interface ValidateUnpublishedResponse {
  // No content returned
}

/**
 * ValidateUnpublished action
 *
 * Unbound action
 */
export class ValidateUnpublishedAction implements Executable<ValidateUnpublishedResponse> {
  constructor(public readonly target: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ValidateUnpublished`;

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

  async parseResponse(response: Response): Promise<ValidateUnpublishedResponse> {
    // No return value (204 No Content)
    return {};
  }
}
