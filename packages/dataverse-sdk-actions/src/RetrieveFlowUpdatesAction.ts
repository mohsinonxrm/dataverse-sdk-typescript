import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveFlowUpdates action
 */
export interface RetrieveFlowUpdatesResponse {
  value: EntityReference[];
}

/**
 * RetrieveFlowUpdates action
 *
 * Unbound action
 */
export class RetrieveFlowUpdatesAction implements Executable<RetrieveFlowUpdatesResponse> {
  constructor(public readonly objectId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFlowUpdates`;

    const body: Record<string, unknown> = {
      ObjectId: this.objectId,
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

  async parseResponse(response: Response): Promise<RetrieveFlowUpdatesResponse> {
    const data = await response.json();
    return data as RetrieveFlowUpdatesResponse;
  }
}
