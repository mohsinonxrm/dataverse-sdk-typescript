import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetRequirementChartDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetRequirementChartData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRequirementChartDataResult {
  "@odata.context"?: string;
  RequirementChartData: string;
}

/**
 * msdyn_GetRequirementChartData response message
 *
 * `result` is the value the msdyn_GetRequirementChartData action returns (see {@link msdyn_GetRequirementChartDataResult}).
 */
export class msdyn_GetRequirementChartDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementChartDataResult) {
    super("msdyn_GetRequirementChartData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetRequirementChartDataResponse {
    return new msdyn_GetRequirementChartDataResponse(data as msdyn_GetRequirementChartDataResult);
  }
}
