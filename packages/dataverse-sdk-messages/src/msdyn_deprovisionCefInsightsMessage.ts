import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_deprovisionCefInsightsResponse as msdyn_deprovisionCefInsightsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_deprovisionCefInsights message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_deprovisionCefInsightsRequestParameters {
  msdyn_deprovisioningMode?: string;
  msdyn_requestOptions?: string;
  msdyn_insightIdsJson?: string;
  msdyn_requestId: string;
}

/**
 * msdyn_deprovisionCefInsights request message
 *
 * Web API Action: msdyn_deprovisionCefInsights
 */
export class msdyn_deprovisionCefInsightsRequest
  extends OrganizationRequest
  implements Executable<msdyn_deprovisionCefInsightsResponse>
{
  declare readonly Parameters: Readonly<msdyn_deprovisionCefInsightsRequestParameters>;

  constructor(parameters: msdyn_deprovisionCefInsightsRequestParameters) {
    super("msdyn_deprovisionCefInsights", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_deprovisionCefInsights`;

    const body = requestBody({
      msdyn_deprovisioningMode: this.Parameters.msdyn_deprovisioningMode,
      msdyn_requestOptions: this.Parameters.msdyn_requestOptions,
      msdyn_insightIdsJson: this.Parameters.msdyn_insightIdsJson,
      msdyn_requestId: this.Parameters.msdyn_requestId,
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

  async parseResponse(response: Response): Promise<msdyn_deprovisionCefInsightsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_deprovisionCefInsightsResponse.fromResponse({});
    return msdyn_deprovisionCefInsightsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_deprovisionCefInsights response message
 */
export class msdyn_deprovisionCefInsightsResponse extends OrganizationResponse {
  constructor(public result: msdyn_deprovisionCefInsightsResponseData) {
    super("msdyn_deprovisionCefInsights");
  }

  static fromResponse(data: unknown): msdyn_deprovisionCefInsightsResponse {
    return new msdyn_deprovisionCefInsightsResponse(
      responseObject<msdyn_deprovisionCefInsightsResponseData>(data)
    );
  }
}
