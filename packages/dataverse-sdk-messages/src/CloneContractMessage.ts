import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { contract } from "./types/index.js";

/**
 * Parameters of the CloneContract message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CloneContractRequestParameters {
  IncludeCanceledLines: boolean;
}

/**
 * CloneContract request message
 *
 * Web API Action: CloneContract
 *
 * The first argument is the id of the contract record to call it on.
 */
export class CloneContractRequest
  extends OrganizationRequest
  implements Executable<CloneContractResponse>
{
  declare readonly Parameters: Readonly<CloneContractRequestParameters>;

  constructor(
    public contractId: string,
    parameters: CloneContractRequestParameters
  ) {
    super("CloneContract", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contracts(${odataLiteral.guid(this.contractId)})/Microsoft.Dynamics.CRM.CloneContract`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<CloneContractResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return CloneContractResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return CloneContractResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CloneContract action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CloneContractResult =
  (contract & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * CloneContract response message
 *
 * `result` is the value the CloneContract action returns (see {@link CloneContractResult}).
 */
export class CloneContractResponse extends OrganizationResponse {
  constructor(public result: CloneContractResult) {
    super("CloneContract");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CloneContractResponse {
    return new CloneContractResponse((data ?? null) as CloneContractResult);
  }
}
