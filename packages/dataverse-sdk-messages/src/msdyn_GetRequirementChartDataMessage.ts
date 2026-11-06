import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetRequirementChartDataResponse as msdyn_GetRequirementChartDataResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetRequirementChartData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRequirementChartDataRequestParameters {
  RequirementId: string;
}

/**
 * msdyn_GetRequirementChartData request message
 *
 * Web API Action: msdyn_GetRequirementChartData
 */
export class msdyn_GetRequirementChartDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRequirementChartDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetRequirementChartDataRequestParameters>;

  constructor(parameters: msdyn_GetRequirementChartDataRequestParameters) {
    super("msdyn_GetRequirementChartData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementChartData`;

    const body = requestBody({
      RequirementId: this.Parameters.RequirementId,
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
    return msdyn_GetRequirementChartDataResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetRequirementChartData response message
 */
export class msdyn_GetRequirementChartDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementChartDataResponseData) {
    super("msdyn_GetRequirementChartData");
  }

  static fromResponse(data: unknown): msdyn_GetRequirementChartDataResponse {
    return new msdyn_GetRequirementChartDataResponse(
      responseObject<msdyn_GetRequirementChartDataResponseData>(data)
    );
  }
}
