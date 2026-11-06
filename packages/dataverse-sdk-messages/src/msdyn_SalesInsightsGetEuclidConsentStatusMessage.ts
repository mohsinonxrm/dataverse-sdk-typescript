import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesInsightsGetEuclidConsentStatusResponse as msdyn_SalesInsightsGetEuclidConsentStatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesInsightsGetEuclidConsentStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesInsightsGetEuclidConsentStatusRequestParameters {
  PermissionLevel: string;
}

/**
 * msdyn_SalesInsightsGetEuclidConsentStatus request message
 *
 * Web API Action: msdyn_SalesInsightsGetEuclidConsentStatus
 */
export class msdyn_SalesInsightsGetEuclidConsentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesInsightsGetEuclidConsentStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesInsightsGetEuclidConsentStatusRequestParameters>;

  constructor(parameters: msdyn_SalesInsightsGetEuclidConsentStatusRequestParameters) {
    super("msdyn_SalesInsightsGetEuclidConsentStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesInsightsGetEuclidConsentStatus`;

    const body = requestBody({
      PermissionLevel: this.Parameters.PermissionLevel,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesInsightsGetEuclidConsentStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesInsightsGetEuclidConsentStatusResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_SalesInsightsGetEuclidConsentStatus response message
 */
export class msdyn_SalesInsightsGetEuclidConsentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesInsightsGetEuclidConsentStatusResponseData) {
    super("msdyn_SalesInsightsGetEuclidConsentStatus");
  }

  static fromResponse(data: unknown): msdyn_SalesInsightsGetEuclidConsentStatusResponse {
    return new msdyn_SalesInsightsGetEuclidConsentStatusResponse(
      responseObject<msdyn_SalesInsightsGetEuclidConsentStatusResponseData>(data)
    );
  }
}
