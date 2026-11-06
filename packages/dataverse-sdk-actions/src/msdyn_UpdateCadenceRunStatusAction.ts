import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateCadenceRunStatus action
 */
export interface msdyn_UpdateCadenceRunStatusResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_UpdateCadenceRunStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateCadenceRunStatusActionParameters {
  SalesCadenceInstanceId?: string;
  StatusType?: number;
  OverallStatus?: number;
  FlowRunStatus?: string;
}

/**
 * msdyn_UpdateCadenceRunStatus action
 *
 * Unbound action
 */
export class msdyn_UpdateCadenceRunStatusAction implements Executable<msdyn_UpdateCadenceRunStatusResponse> {
  constructor(public readonly parameters: msdyn_UpdateCadenceRunStatusActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateCadenceRunStatus`;

    const body = requestBody({
      SalesCadenceInstanceId: this.parameters.SalesCadenceInstanceId,
      StatusType: this.parameters.StatusType,
      OverallStatus: this.parameters.OverallStatus,
      FlowRunStatus: this.parameters.FlowRunStatus,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateCadenceRunStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdateCadenceRunStatusResponse;
    return (await response.json()) as msdyn_UpdateCadenceRunStatusResponse;
  }
}
