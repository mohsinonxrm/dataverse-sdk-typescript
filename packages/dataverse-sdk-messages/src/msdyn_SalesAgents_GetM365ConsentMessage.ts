import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_GetM365ConsentResponse as msdyn_SalesAgents_GetM365ConsentResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_GetM365Consent request message
 *
 * Web API Action: msdyn_SalesAgents_GetM365Consent
 */
export class msdyn_SalesAgents_GetM365ConsentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetM365ConsentResponse>
{
  constructor() {
    super("msdyn_SalesAgents_GetM365Consent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetM365Consent`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_GetM365ConsentResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAgents_GetM365ConsentResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SalesAgents_GetM365Consent response message
 */
export class msdyn_SalesAgents_GetM365ConsentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetM365ConsentResponseData) {
    super("msdyn_SalesAgents_GetM365Consent");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetM365ConsentResponse {
    return new msdyn_SalesAgents_GetM365ConsentResponse(
      responseObject<msdyn_SalesAgents_GetM365ConsentResponseData>(data)
    );
  }
}
