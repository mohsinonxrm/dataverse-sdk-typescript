import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_FireDueSchedules action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FireDueSchedulesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_FireDueSchedulesResponse;
  }
}
