import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { ColumnSet } from "./types/index.js";

/**
 * Response from the GenerateQuoteFromOpportunity action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GenerateQuoteFromOpportunityResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as GenerateQuoteFromOpportunityResponse;
  }
}
