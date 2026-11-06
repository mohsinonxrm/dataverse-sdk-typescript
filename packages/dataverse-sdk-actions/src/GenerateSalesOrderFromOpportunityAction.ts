import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
 * GenerateSalesOrderFromOpportunity action
 *
 * Unbound action
 */
export class GenerateSalesOrderFromOpportunityAction implements Executable<GenerateSalesOrderFromOpportunityResponse> {
  constructor(
    public readonly opportunityId: string,
    public readonly columnSet?: ColumnSet
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateSalesOrderFromOpportunity`;

    const body: Record<string, unknown> = {
      OpportunityId: this.opportunityId,
      ColumnSet: enumBody(this.columnSet, "ColumnSet"),
    };

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
    const data = await response.json();
    return data as GenerateSalesOrderFromOpportunityResponse;
  }
}
