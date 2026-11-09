import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_GetM365ConsentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_GetM365Consent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetM365ConsentResult {
  "@odata.context"?: string;
  msdyn_IsTeamsConsentGranted: boolean;
  msdyn_IsTenantConsentGranted: boolean;
  msdyn_SellerConsentStatus: string;
}

/**
 * msdyn_SalesAgents_GetM365Consent response message
 *
 * `result` is the value the msdyn_SalesAgents_GetM365Consent action returns (see {@link msdyn_SalesAgents_GetM365ConsentResult}).
 */
export class msdyn_SalesAgents_GetM365ConsentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetM365ConsentResult) {
    super("msdyn_SalesAgents_GetM365Consent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_GetM365ConsentResponse {
    return new msdyn_SalesAgents_GetM365ConsentResponse(
      data as msdyn_SalesAgents_GetM365ConsentResult
    );
  }
}
