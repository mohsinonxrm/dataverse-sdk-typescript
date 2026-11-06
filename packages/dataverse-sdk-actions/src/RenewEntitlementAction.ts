import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { entitlement } from "./types/index.js";

/**
 * Response from the RenewEntitlement action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RenewEntitlementResponse =
  | (entitlement & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as RenewEntitlementResponse;
  }
}
