import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from Restore action
 */
export interface RestoreResponse {
  id: string;
}

/**
 * Restore action
 *
 * Unbound action
 */
export class RestoreAction implements Executable<RestoreResponse> {
  constructor(public readonly target: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Restore`;

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

  async parseResponse(response: Response): Promise<RestoreResponse> {
    const data = await response.json();
    return data as RestoreResponse;
  }
}
