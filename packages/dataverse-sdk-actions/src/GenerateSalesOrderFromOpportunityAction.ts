import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { ColumnSet } from "./types/index.js";

/**
 * Response from GenerateSalesOrderFromOpportunity action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface GenerateSalesOrderFromOpportunityResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as GenerateSalesOrderFromOpportunityResponse;
  }
}
