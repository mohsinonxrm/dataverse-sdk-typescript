import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FireDueSchedules action
 */
export interface msdyn_FireDueSchedulesResponse {
  ResultJson: string;
}

/**
 * Parameters of the msdyn_FireDueSchedules action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FireDueSchedulesActionParameters {
  MaxSchedules?: number;
  WorkflowRunId?: string;
}

/**
 * msdyn_FireDueSchedules action
 *
 * Unbound action
 */
export class msdyn_FireDueSchedulesAction implements Executable<msdyn_FireDueSchedulesResponse> {
  constructor(public readonly parameters: msdyn_FireDueSchedulesActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FireDueSchedules`;

    const body = requestBody({
      MaxSchedules: this.parameters.MaxSchedules,
      WorkflowRunId: this.parameters.WorkflowRunId,
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

  async parseResponse(response: Response): Promise<msdyn_FireDueSchedulesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_FireDueSchedulesResponse;
    return (await response.json()) as msdyn_FireDueSchedulesResponse;
  }
}
