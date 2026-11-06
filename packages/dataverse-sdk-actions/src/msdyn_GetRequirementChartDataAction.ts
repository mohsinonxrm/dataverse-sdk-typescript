import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetRequirementChartData action
 */
export interface msdyn_GetRequirementChartDataResponse {
  RequirementChartData: string;
}

/**
 * Parameters of the msdyn_GetRequirementChartData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRequirementChartDataActionParameters {
  RequirementId: string;
}

/**
 * msdyn_GetRequirementChartData action
 *
 * Unbound action
 */
export class msdyn_GetRequirementChartDataAction implements Executable<msdyn_GetRequirementChartDataResponse> {
  constructor(public readonly parameters: msdyn_GetRequirementChartDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementChartData`;

    const body = requestBody({
      RequirementId: this.parameters.RequirementId,
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementChartDataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetRequirementChartDataResponse;
  }
}
