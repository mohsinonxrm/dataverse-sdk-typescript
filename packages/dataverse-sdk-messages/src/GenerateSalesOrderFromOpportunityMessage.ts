import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { ColumnSet } from "./types/index.js";

/**
 * Parameters of the GenerateSalesOrderFromOpportunity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateSalesOrderFromOpportunityRequestParameters {
  OpportunityId: string;
  ColumnSet?: ColumnSet;
}

/**
 * GenerateSalesOrderFromOpportunity request message
 *
 * Web API Action: GenerateSalesOrderFromOpportunity
 */
export class GenerateSalesOrderFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GenerateSalesOrderFromOpportunityResponse>
{
  declare readonly Parameters: Readonly<GenerateSalesOrderFromOpportunityRequestParameters>;

  constructor(parameters: GenerateSalesOrderFromOpportunityRequestParameters) {
    super("GenerateSalesOrderFromOpportunity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateSalesOrderFromOpportunity`;

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

  async parseResponse(response: Response): Promise<GenerateSalesOrderFromOpportunityResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return GenerateSalesOrderFromOpportunityResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return GenerateSalesOrderFromOpportunityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GenerateSalesOrderFromOpportunity action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GenerateSalesOrderFromOpportunityResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * GenerateSalesOrderFromOpportunity response message
 *
 * `result` is the value the GenerateSalesOrderFromOpportunity action returns (see {@link GenerateSalesOrderFromOpportunityResult}).
 */
export class GenerateSalesOrderFromOpportunityResponse extends OrganizationResponse {
  constructor(public result: GenerateSalesOrderFromOpportunityResult) {
    super("GenerateSalesOrderFromOpportunity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GenerateSalesOrderFromOpportunityResponse {
    return new GenerateSalesOrderFromOpportunityResponse(
      (data ?? null) as GenerateSalesOrderFromOpportunityResult
    );
  }
}
