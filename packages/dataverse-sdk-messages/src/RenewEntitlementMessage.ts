import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
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
    const url = `${baseUrl}/entitlements(${odataLiteral.guid(this.entitlementId)})/Microsoft.Dynamics.CRM.RenewEntitlement`;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return RenewEntitlementResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return RenewEntitlementResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RenewEntitlement action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RenewEntitlementResult =
  | (entitlement & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * RenewEntitlement response message
 *
 * `result` is the value the RenewEntitlement action returns (see {@link RenewEntitlementResult}).
 */
export class RenewEntitlementResponse extends OrganizationResponse {
  constructor(public result: RenewEntitlementResult) {
    super("RenewEntitlement");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RenewEntitlementResponse {
    return new RenewEntitlementResponse((data ?? null) as RenewEntitlementResult);
  }
}
