import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_RevokeSellerM365ConsentResponse as msdyn_SalesAgents_RevokeSellerM365ConsentResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_RevokeSellerM365Consent request message
 *
 * Web API Action: msdyn_SalesAgents_RevokeSellerM365Consent
 */
export class msdyn_SalesAgents_RevokeSellerM365ConsentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_RevokeSellerM365ConsentResponse>
{
  constructor() {
    super("msdyn_SalesAgents_RevokeSellerM365Consent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_RevokeSellerM365Consent`;

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
  ): Promise<msdyn_SalesAgents_RevokeSellerM365ConsentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_RevokeSellerM365ConsentResponse.fromResponse({});
    return msdyn_SalesAgents_RevokeSellerM365ConsentResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgents_RevokeSellerM365Consent response message
 */
export class msdyn_SalesAgents_RevokeSellerM365ConsentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_RevokeSellerM365ConsentResponseData) {
    super("msdyn_SalesAgents_RevokeSellerM365Consent");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_RevokeSellerM365ConsentResponse {
    return new msdyn_SalesAgents_RevokeSellerM365ConsentResponse(
      responseObject<msdyn_SalesAgents_RevokeSellerM365ConsentResponseData>(data)
    );
  }
}
