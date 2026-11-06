import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CheckIfActivityMonitorEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfActivityMonitorEnabledResponse {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckIfActivityMonitorEnabledResponse;
  }
}
