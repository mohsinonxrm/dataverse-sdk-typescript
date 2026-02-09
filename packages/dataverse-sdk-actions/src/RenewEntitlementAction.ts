import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { entitlement } from "./types/index.js";

/**
 * Response from RenewEntitlement action
 */
export interface RenewEntitlementResponse {
  value: entitlement;
}

/**
 * RenewEntitlement action
 *
 * Bound action
 * Binding parameter: entity (mscrm.entitlement)
 */
export class RenewEntitlementAction implements Executable<RenewEntitlementResponse> {
  constructor(
    public readonly entitlementId: string,
    public readonly status: number
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RenewEntitlementResponse> {
    const data = await response.json();
    return data as RenewEntitlementResponse;
  }
}
