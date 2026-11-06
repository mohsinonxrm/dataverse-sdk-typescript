import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from RevertProduct action
 */
export interface RevertProductResponse {
  // No content returned
}

/**
 * RevertProduct action
 *
 * Unbound action
 */
export class RevertProductAction implements Executable<RevertProductResponse> {
  constructor(public readonly target: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RevertProduct`;

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

  async parseResponse(response: Response): Promise<RevertProductResponse> {
    // No return value (204 No Content)
    return {};
  }
}
