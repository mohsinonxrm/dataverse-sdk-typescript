import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from RetrieveConnectorActions action
 */
export interface RetrieveConnectorActionsResponse {
  value: EntityReference[];
}

/**
 * Parameters of the RetrieveConnectorActions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveConnectorActionsActionParameters {
  ConnectionReference: EntityReference | AnyEntityPayload;
}

/**
 * RetrieveConnectorActions action
 *
 * Unbound action
 */
export class RetrieveConnectorActionsAction implements Executable<RetrieveConnectorActionsResponse> {
  constructor(public readonly parameters: RetrieveConnectorActionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveConnectorActions`;

    const body = requestBody({
      ConnectionReference: this.parameters.ConnectionReference,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveConnectorActionsResponse;
    return (await response.json()) as RetrieveConnectorActionsResponse;
  }
}
