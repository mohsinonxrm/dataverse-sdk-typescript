import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { entitlement } from "./types/index.js";

/**
 * Response from RenewEntitlement action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RenewEntitlementResponse extends entitlement {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the RenewEntitlement action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RenewEntitlementActionParameters {
  Status: number;
}

/**
 * RenewEntitlement action
 *
 * Bound action
 * Binding parameter: entity (mscrm.entitlement)
 *
 * The first argument is the id of the entitlement record to call it on.
 */
export class RenewEntitlementAction implements Executable<RenewEntitlementResponse> {
  constructor(
    public readonly entitlementId: string,
    public readonly parameters: RenewEntitlementActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/entitlements(${this.entitlementId})/Microsoft.Dynamics.CRM.RenewEntitlement`;

    const body = requestBody({
      Status: this.parameters.Status,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RenewEntitlementResponse;
  }
}
