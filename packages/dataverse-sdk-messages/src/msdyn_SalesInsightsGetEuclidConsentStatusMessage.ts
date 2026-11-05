import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesInsightsGetEuclidConsentStatusResponse as msdyn_SalesInsightsGetEuclidConsentStatusResponseData } from "./types/index.js";

/**
 * msdyn_SalesInsightsGetEuclidConsentStatus request message
 *
 * Web API Action: msdyn_SalesInsightsGetEuclidConsentStatus
 */
export class msdyn_SalesInsightsGetEuclidConsentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesInsightsGetEuclidConsentStatusResponse>
{
  constructor(public permissionLevel: string) {
    super("msdyn_SalesInsightsGetEuclidConsentStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesInsightsGetEuclidConsentStatus`;

    const body: Record<string, unknown> = {
      PermissionLevel: this.permissionLevel,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesInsightsGetEuclidConsentStatusResponse> {
    const data = await response.json();
    return msdyn_SalesInsightsGetEuclidConsentStatusResponse.fromResponse(data);
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
