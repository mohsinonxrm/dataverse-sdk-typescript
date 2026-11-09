import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { contract } from "./types/index.js";

/**
 * Parameters of the RenewContract message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RenewContractRequestParameters {
  Status: number;
  IncludeCanceledLines: boolean;
}

/**
 * RenewContract request message
 *
 * Web API Action: RenewContract
 *
 * The first argument is the id of the contract record to call it on.
 */
export class RenewContractRequest
  extends OrganizationRequest
  implements Executable<RenewContractResponse>
{
  declare readonly Parameters: Readonly<RenewContractRequestParameters>;

  constructor(
    public contractId: string,
    parameters: RenewContractRequestParameters
  ) {
    super("RenewContract", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contracts(${odataLiteral.guid(this.contractId)})/Microsoft.Dynamics.CRM.RenewContract`;

    const body = requestBody({
      Status: this.Parameters.Status,
      IncludeCanceledLines: this.Parameters.IncludeCanceledLines,
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

  async parseResponse(response: Response): Promise<RenewContractResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return RenewContractResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return RenewContractResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RenewContract action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RenewContractResult =
  (contract & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * RenewContract response message
 *
 * `result` is the value the RenewContract action returns (see {@link RenewContractResult}).
 */
export class RenewContractResponse extends OrganizationResponse {
  constructor(public result: RenewContractResult) {
    super("RenewContract");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RenewContractResponse {
    return new RenewContractResponse((data ?? null) as RenewContractResult);
  }
}
