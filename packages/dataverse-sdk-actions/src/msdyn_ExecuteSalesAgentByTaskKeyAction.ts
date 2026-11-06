import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ExecuteSalesAgentByTaskKey action
 */
export interface msdyn_ExecuteSalesAgentByTaskKeyResponse {
  msdyn_ErrorMessage: string;
  msdyn_IsSuccess: boolean;
  msdyn_TaskResponse: string;
}

/**
 * Parameters of the msdyn_ExecuteSalesAgentByTaskKey action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteSalesAgentByTaskKeyActionParameters {
  msdyn_InputData?: string;
  msdyn_CorrelationParameters?: string;
  msdyn_TaskKey: string;
  msdyn_PartnerSource: string;
}

/**
 * msdyn_ExecuteSalesAgentByTaskKey action
 *
 * Unbound action
 */
export class msdyn_ExecuteSalesAgentByTaskKeyAction implements Executable<msdyn_ExecuteSalesAgentByTaskKeyResponse> {
  constructor(public readonly parameters: msdyn_ExecuteSalesAgentByTaskKeyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteSalesAgentByTaskKey`;

    const body = requestBody({
      msdyn_InputData: this.parameters.msdyn_InputData,
      msdyn_CorrelationParameters: this.parameters.msdyn_CorrelationParameters,
      msdyn_TaskKey: this.parameters.msdyn_TaskKey,
      msdyn_PartnerSource: this.parameters.msdyn_PartnerSource,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteSalesAgentByTaskKeyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ExecuteSalesAgentByTaskKeyResponse;
    return (await response.json()) as msdyn_ExecuteSalesAgentByTaskKeyResponse;
  }
}
