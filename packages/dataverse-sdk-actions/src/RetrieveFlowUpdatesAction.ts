import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from RetrieveFlowUpdates action
 */
export interface RetrieveFlowUpdatesResponse {
  value: EntityReference[];
}

/**
 * Parameters of the RetrieveFlowUpdates action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFlowUpdatesActionParameters {
  ObjectId: string;
}

/**
 * RetrieveFlowUpdates action
 *
 * Unbound action
 */
export class RetrieveFlowUpdatesAction implements Executable<RetrieveFlowUpdatesResponse> {
  constructor(public readonly parameters: RetrieveFlowUpdatesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFlowUpdates`;

    const body = requestBody({
      ObjectId: this.parameters.ObjectId,
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

  async parseResponse(response: Response): Promise<RetrieveFlowUpdatesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveFlowUpdatesResponse;
  }
}
