import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveConnectorActions action
 */
export interface RetrieveConnectorActionsResponse {
  value: EntityReference[];
}

/**
 * RetrieveConnectorActions action
 *
 * Unbound action
 */
export class RetrieveConnectorActionsAction implements Executable<RetrieveConnectorActionsResponse> {
  constructor(public readonly connectionReference: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveConnectorActions`;

    const body: Record<string, unknown> = {
      ConnectionReference: this.connectionReference,
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

  async parseResponse(response: Response): Promise<RetrieveConnectorActionsResponse> {
    const data = await response.json();
    return data as RetrieveConnectorActionsResponse;
  }
}
