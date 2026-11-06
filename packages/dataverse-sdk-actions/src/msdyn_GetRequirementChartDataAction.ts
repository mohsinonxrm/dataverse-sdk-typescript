import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetRequirementChartData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRequirementChartDataResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetRequirementChartDataResponse;
  }
}
