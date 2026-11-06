import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ExecuteCopilotServiceJob action
 */
export interface msdyn_ExecuteCopilotServiceJobResponse {
  msdyn_Response: string;
}

/**
 * Parameters of the msdyn_ExecuteCopilotServiceJob action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteCopilotServiceJobActionParameters {
  msdyn_AuthFlowType?: number;
  msdyn_JobPayload?: string;
  msdyn_JobType: number;
}

/**
 * msdyn_ExecuteCopilotServiceJob action
 *
 * Unbound action
 */
export class msdyn_ExecuteCopilotServiceJobAction implements Executable<msdyn_ExecuteCopilotServiceJobResponse> {
  constructor(public readonly parameters: msdyn_ExecuteCopilotServiceJobActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteCopilotServiceJob`;

    const body = requestBody({
      msdyn_AuthFlowType: this.parameters.msdyn_AuthFlowType,
      msdyn_JobPayload: this.parameters.msdyn_JobPayload,
      msdyn_JobType: this.parameters.msdyn_JobType,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteCopilotServiceJobResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ExecuteCopilotServiceJobResponse;
    return (await response.json()) as msdyn_ExecuteCopilotServiceJobResponse;
  }
}
