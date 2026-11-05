import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetRequirementChartData action
 */
export interface msdyn_GetRequirementChartDataResponse {
  RequirementChartData: string;
}

/**
 * msdyn_GetRequirementChartData action
 *
 * Unbound action
 */
export class msdyn_GetRequirementChartDataAction implements Executable<msdyn_GetRequirementChartDataResponse> {
  constructor(public readonly requirementId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementChartData`;

    const body: Record<string, unknown> = {
      RequirementId: this.requirementId,
    };

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
    const data = await response.json();
    return data as msdyn_GetRequirementChartDataResponse;
  }
}
