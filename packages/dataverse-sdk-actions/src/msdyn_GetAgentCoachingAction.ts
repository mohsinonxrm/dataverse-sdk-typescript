import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetAgentCoaching action
 */
export interface msdyn_GetAgentCoachingResponse {
  msdyn_CoachingResult: string;
  msdyn_ErrorResult: string;
}

/**
 * Parameters of the msdyn_GetAgentCoaching action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAgentCoachingActionParameters {
  msdyn_RecordType: string;
  msdyn_RegardingId: string;
}

/**
 * msdyn_GetAgentCoaching action
 *
 * Unbound action
 */
export class msdyn_GetAgentCoachingAction implements Executable<msdyn_GetAgentCoachingResponse> {
  constructor(public readonly parameters: msdyn_GetAgentCoachingActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAgentCoaching`;

    const body = requestBody({
      msdyn_RecordType: this.parameters.msdyn_RecordType,
      msdyn_RegardingId: this.parameters.msdyn_RegardingId,
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

  async parseResponse(response: Response): Promise<msdyn_GetAgentCoachingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetAgentCoachingResponse;
    return (await response.json()) as msdyn_GetAgentCoachingResponse;
  }
}
