import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse as msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_ProvideConsentAndM365SetupAPI request message
 *
 * Web API Action: msdyn_SalesAgents_ProvideConsentAndM365SetupAPI
 */
export class msdyn_SalesAgents_ProvideConsentAndM365SetupAPIRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse>
{
  constructor() {
    super("msdyn_SalesAgents_ProvideConsentAndM365SetupAPI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProvideConsentAndM365SetupAPI`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_SalesAgents_ProvideConsentAndM365SetupAPI response message
 */
export class msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponseData) {
    super("msdyn_SalesAgents_ProvideConsentAndM365SetupAPI");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse {
    return new msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse(
      responseObject<msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponseData>(data)
    );
  }
}
