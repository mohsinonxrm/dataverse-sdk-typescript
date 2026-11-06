import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckIfActivityMonitorEnabled action
 */
export interface msdyn_CheckIfActivityMonitorEnabledResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
  HelpLink: string;
}

/**
 * Parameters of the msdyn_CheckIfActivityMonitorEnabled action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfActivityMonitorEnabledActionParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckIfActivityMonitorEnabled action
 *
 * Unbound action
 */
export class msdyn_CheckIfActivityMonitorEnabledAction implements Executable<msdyn_CheckIfActivityMonitorEnabledResponse> {
  constructor(
    public readonly parameters: msdyn_CheckIfActivityMonitorEnabledActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfActivityMonitorEnabled`;

    const body = requestBody({
      SolutionId: this.parameters.SolutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfActivityMonitorEnabledResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckIfActivityMonitorEnabledResponse;
  }
}
