import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { ColumnSet } from "./types/index.js";

/**
 * Parameters of the GenerateInvoiceFromOpportunity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateInvoiceFromOpportunityRequestParameters {
  OpportunityId: string;
  ColumnSet?: ColumnSet;
}

/**
 * GenerateInvoiceFromOpportunity request message
 *
 * Web API Action: GenerateInvoiceFromOpportunity
 */
export class GenerateInvoiceFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GenerateInvoiceFromOpportunityResponse>
{
  declare readonly Parameters: Readonly<GenerateInvoiceFromOpportunityRequestParameters>;

  constructor(parameters: GenerateInvoiceFromOpportunityRequestParameters) {
    super("GenerateInvoiceFromOpportunity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateInvoiceFromOpportunity`;

    const body = requestBody({
      OpportunityId: this.Parameters.OpportunityId,
      ColumnSet: enumBody(this.Parameters.ColumnSet, "ColumnSet"),
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

  async parseResponse(response: Response): Promise<GenerateInvoiceFromOpportunityResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return GenerateInvoiceFromOpportunityResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return GenerateInvoiceFromOpportunityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GenerateInvoiceFromOpportunity action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GenerateInvoiceFromOpportunityResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * GenerateInvoiceFromOpportunity response message
 *
 * `result` is the value the GenerateInvoiceFromOpportunity action returns (see {@link GenerateInvoiceFromOpportunityResult}).
 */
export class GenerateInvoiceFromOpportunityResponse extends OrganizationResponse {
  constructor(public result: GenerateInvoiceFromOpportunityResult) {
    super("GenerateInvoiceFromOpportunity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GenerateInvoiceFromOpportunityResponse {
    return new GenerateInvoiceFromOpportunityResponse(
      (data ?? null) as GenerateInvoiceFromOpportunityResult
    );
  }
}
