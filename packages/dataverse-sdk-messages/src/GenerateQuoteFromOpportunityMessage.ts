import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { ColumnSet } from "./types/index.js";

/**
 * Parameters of the GenerateQuoteFromOpportunity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateQuoteFromOpportunityRequestParameters {
  OpportunityId: string;
  ColumnSet?: ColumnSet;
  ProcessInstanceId?: EntityReference | AnyEntityPayload;
}

/**
 * GenerateQuoteFromOpportunity request message
 *
 * Web API Action: GenerateQuoteFromOpportunity
 */
export class GenerateQuoteFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GenerateQuoteFromOpportunityResponse>
{
  declare readonly Parameters: Readonly<GenerateQuoteFromOpportunityRequestParameters>;

  constructor(parameters: GenerateQuoteFromOpportunityRequestParameters) {
    super("GenerateQuoteFromOpportunity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateQuoteFromOpportunity`;

    const body = requestBody({
      OpportunityId: this.Parameters.OpportunityId,
      ColumnSet: enumBody(this.Parameters.ColumnSet, "ColumnSet"),
      ProcessInstanceId: this.Parameters.ProcessInstanceId,
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

  async parseResponse(response: Response): Promise<GenerateQuoteFromOpportunityResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return GenerateQuoteFromOpportunityResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return GenerateQuoteFromOpportunityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GenerateQuoteFromOpportunity action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GenerateQuoteFromOpportunityResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * GenerateQuoteFromOpportunity response message
 *
 * `result` is the value the GenerateQuoteFromOpportunity action returns (see {@link GenerateQuoteFromOpportunityResult}).
 */
export class GenerateQuoteFromOpportunityResponse extends OrganizationResponse {
  constructor(public result: GenerateQuoteFromOpportunityResult) {
    super("GenerateQuoteFromOpportunity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GenerateQuoteFromOpportunityResponse {
    return new GenerateQuoteFromOpportunityResponse(
      (data ?? null) as GenerateQuoteFromOpportunityResult
    );
  }
}
