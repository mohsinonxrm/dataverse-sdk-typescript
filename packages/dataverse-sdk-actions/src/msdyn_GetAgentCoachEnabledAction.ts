import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetAgentCoachEnabled action
 */
export interface msdyn_GetAgentCoachEnabledResponse {
  msdyn_ErrorResult: string;
  msdyn_IsEnabled: string;
}

/**
 * Parameters of the msdyn_GetAgentCoachEnabled action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAgentCoachEnabledActionParameters {
  msdyn_RecordType: string;
}

/**
 * msdyn_GetAgentCoachEnabled action
 *
 * Unbound action
 */
export class msdyn_GetAgentCoachEnabledAction implements Executable<msdyn_GetAgentCoachEnabledResponse> {
  constructor(public readonly parameters: msdyn_GetAgentCoachEnabledActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAgentCoachEnabled`;

    const body = requestBody({
      msdyn_RecordType: this.parameters.msdyn_RecordType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAgentCoachEnabledResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetAgentCoachEnabledResponse;
    return (await response.json()) as msdyn_GetAgentCoachEnabledResponse;
  }
}
