import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { entitlement } from "./types/index.js";

/**
 * RenewEntitlement request message
 *
 * Web API Action: RenewEntitlement
 */
export class RenewEntitlementRequest
  extends OrganizationRequest
  implements Executable<RenewEntitlementResponse>
{
  constructor(
    public entitlementId: string,
    public status: number
  ) {
    super("RenewEntitlement");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/entitlements(${this.entitlementId})/Microsoft.Dynamics.CRM.RenewEntitlement`;

    const body: Record<string, unknown> = {
      Status: this.status,
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

  async parseResponse(response: Response): Promise<RenewEntitlementResponse> {
    const data = await response.json();
    return RenewEntitlementResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.entitlementId,
      Status: this.status,
    };
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
    return new RenewEntitlementResponse((data as any).value);
  }
}
