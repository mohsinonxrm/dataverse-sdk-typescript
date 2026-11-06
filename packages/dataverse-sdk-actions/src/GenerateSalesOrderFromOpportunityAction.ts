import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { ColumnSet } from "./types/index.js";

/**
 * Response from the GenerateSalesOrderFromOpportunity action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GenerateSalesOrderFromOpportunityResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * Parameters of the GenerateSalesOrderFromOpportunity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateSalesOrderFromOpportunityActionParameters {
  OpportunityId: string;
  ColumnSet?: ColumnSet;
}

/**
 * GenerateSalesOrderFromOpportunity action
 *
 * Unbound action
 */
export class GenerateSalesOrderFromOpportunityAction implements Executable<GenerateSalesOrderFromOpportunityResponse> {
  constructor(public readonly parameters: GenerateSalesOrderFromOpportunityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateSalesOrderFromOpportunity`;

    const body = requestBody({
      OpportunityId: this.parameters.OpportunityId,
      ColumnSet: enumBody(this.parameters.ColumnSet, "ColumnSet"),
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
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as GenerateSalesOrderFromOpportunityResponse;
  }
}
