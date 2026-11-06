import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { recurringappointmentmaster } from "./types/index.js";

/**
 * Response from DeleteOpenInstances action
 */
export interface DeleteOpenInstancesResponse {
  // No content returned
}

/**
 * Parameters of the DeleteOpenInstances action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteOpenInstancesActionParameters {
  Target: EntityReference | EntityPayload<recurringappointmentmaster>;
  SeriesEndDate: string;
  StateOfPastInstances: number;
}

/**
 * DeleteOpenInstances action
 *
 * Unbound action
 */
export class DeleteOpenInstancesAction implements Executable<DeleteOpenInstancesResponse> {
  constructor(public readonly parameters: DeleteOpenInstancesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteOpenInstances`;

    const body = requestBody({
      Target: this.parameters.Target,
      SeriesEndDate: this.parameters.SeriesEndDate,
      StateOfPastInstances: this.parameters.StateOfPastInstances,
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

  async parseResponse(response: Response): Promise<DeleteOpenInstancesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as DeleteOpenInstancesResponse;
  }
}
