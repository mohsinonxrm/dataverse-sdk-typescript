import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { ColumnSet } from "./types/index.js";

/**
 * Response from GenerateQuoteFromOpportunity action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface GenerateQuoteFromOpportunityResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the GenerateQuoteFromOpportunity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateQuoteFromOpportunityActionParameters {
  OpportunityId: string;
  ColumnSet?: ColumnSet;
  ProcessInstanceId?: EntityReference | AnyEntityPayload;
}

/**
 * GenerateQuoteFromOpportunity action
 *
 * Unbound action
 */
export class GenerateQuoteFromOpportunityAction implements Executable<GenerateQuoteFromOpportunityResponse> {
  constructor(public readonly parameters: GenerateQuoteFromOpportunityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateQuoteFromOpportunity`;

    const body = requestBody({
      OpportunityId: this.parameters.OpportunityId,
      ColumnSet: enumBody(this.parameters.ColumnSet, "ColumnSet"),
      ProcessInstanceId: this.parameters.ProcessInstanceId,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GenerateQuoteFromOpportunityResponse;
    return (await response.json()) as GenerateQuoteFromOpportunityResponse;
  }
}
