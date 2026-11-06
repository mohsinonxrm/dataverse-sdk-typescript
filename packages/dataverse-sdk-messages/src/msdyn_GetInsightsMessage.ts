import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetInsightsResponse as msdyn_GetInsightsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetInsights message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetInsightsRequestParameters {
  msdyn_payload: string;
  msdyn_insighttype: string;
  msdyn_responseFormat?: string;
}

/**
 * msdyn_GetInsights request message
 *
 * Web API Action: msdyn_GetInsights
 */
export class msdyn_GetInsightsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetInsightsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetInsightsRequestParameters>;

  constructor(parameters: msdyn_GetInsightsRequestParameters) {
    super("msdyn_GetInsights", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetInsights`;

    const body = requestBody({
      msdyn_payload: this.Parameters.msdyn_payload,
      msdyn_insighttype: this.Parameters.msdyn_insighttype,
      msdyn_responseFormat: this.Parameters.msdyn_responseFormat,
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

  async parseResponse(response: Response): Promise<msdyn_GetInsightsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetInsightsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetInsights response message
 */
export class msdyn_GetInsightsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetInsightsResponseData) {
    super("msdyn_GetInsights");
  }

  static fromResponse(data: unknown): msdyn_GetInsightsResponse {
    return new msdyn_GetInsightsResponse(responseObject<msdyn_GetInsightsResponseData>(data));
  }
}
