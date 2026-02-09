import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { ColumnSet } from "./types/index.js";

/**
 * Response from GenerateSalesOrderFromOpportunity action
 */
export interface GenerateSalesOrderFromOpportunityResponse {
  value: EntityReference;
}

/**
 * GenerateSalesOrderFromOpportunity action
 *
 * Unbound action
 */
export class GenerateSalesOrderFromOpportunityAction implements Executable<GenerateSalesOrderFromOpportunityResponse> {
  constructor(
    public readonly opportunityId: string,
    public readonly columnSet: ColumnSet
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateSalesOrderFromOpportunity`;

    const body: Record<string, unknown> = {
      OpportunityId: this.opportunityId,
      ColumnSet: this.columnSet,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GenerateSalesOrderFromOpportunityResponse> {
    const data = await response.json();
    return data as GenerateSalesOrderFromOpportunityResponse;
  }
}
