import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { entitlement } from "./types/index.js";

/**
 * Parameters of the RenewEntitlement message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RenewEntitlementRequestParameters {
  Status: number;
}

/**
 * RenewEntitlement request message
 *
 * Web API Action: RenewEntitlement
 *
 * The first argument is the id of the entitlement record to call it on.
 */
export class RenewEntitlementRequest
  extends OrganizationRequest
  implements Executable<RenewEntitlementResponse>
{
  declare readonly Parameters: Readonly<RenewEntitlementRequestParameters>;

  constructor(
    public entitlementId: string,
    parameters: RenewEntitlementRequestParameters
  ) {
    super("RenewEntitlement", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/entitlements(${this.entitlementId})/Microsoft.Dynamics.CRM.RenewEntitlement`;

    const body = requestBody({
      Status: this.Parameters.Status,
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

  async parseResponse(response: Response): Promise<RenewEntitlementResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return RenewEntitlementResponse.fromResponse({});
    return RenewEntitlementResponse.fromResponse(await response.json());
  }
}

/**
 * RenewEntitlement response message
 */
export class RenewEntitlementResponse extends OrganizationResponse {
  constructor(public result: entitlement) {
    super("RenewEntitlement");
  }

  static fromResponse(data: unknown): RenewEntitlementResponse {
    return new RenewEntitlementResponse(responseObject<entitlement>(data));
  }
}
