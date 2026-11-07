import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_RevokeSellerM365ConsentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_RevokeSellerM365Consent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_RevokeSellerM365ConsentResult {
  "@odata.context"?: string;
  msdyn_ConnectionName: string;
}

/**
 * msdyn_SalesAgents_RevokeSellerM365Consent response message
 *
 * `result` is the value the msdyn_SalesAgents_RevokeSellerM365Consent action returns (see {@link msdyn_SalesAgents_RevokeSellerM365ConsentResult}).
 */
export class msdyn_SalesAgents_RevokeSellerM365ConsentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_RevokeSellerM365ConsentResult) {
    super("msdyn_SalesAgents_RevokeSellerM365Consent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_RevokeSellerM365ConsentResponse {
    return new msdyn_SalesAgents_RevokeSellerM365ConsentResponse(
      data as msdyn_SalesAgents_RevokeSellerM365ConsentResult
    );
  }
}
