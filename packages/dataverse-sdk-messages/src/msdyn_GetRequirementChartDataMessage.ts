import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetRequirementChartData request message
 *
 * Web API Action: msdyn_GetRequirementChartData
 */
export class msdyn_GetRequirementChartDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRequirementChartDataResponse>
{
  constructor(public requirementId: string) {
    super("msdyn_GetRequirementChartData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementChartData`;

    const body: Record<string, unknown> = {
      RequirementId: this.requirementId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetRequirementChartDataResponse> {
    const data = await response.json();
    return msdyn_GetRequirementChartDataResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RequirementId: this.requirementId,
    };
  }
}

/**
 * msdyn_GetRequirementChartData response message
 */
export class msdyn_GetRequirementChartDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementChartDataResponse) {
    super("msdyn_GetRequirementChartData");
  }

  static fromResponse(data: unknown): msdyn_GetRequirementChartDataResponse {
    return new msdyn_GetRequirementChartDataResponse((data as any).value);
  }
}
