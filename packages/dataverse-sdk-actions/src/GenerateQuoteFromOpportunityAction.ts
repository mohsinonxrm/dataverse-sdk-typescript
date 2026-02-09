import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { ColumnSet } from "./types/index.js";

/**
 * Response from GenerateQuoteFromOpportunity action
 */
export interface GenerateQuoteFromOpportunityResponse {
  value: EntityReference;
}

/**
 * GenerateQuoteFromOpportunity action
 *
 * Unbound action
 */
export class GenerateQuoteFromOpportunityAction implements Executable<GenerateQuoteFromOpportunityResponse> {
  constructor(
    public readonly opportunityId: string,
    public readonly columnSet: ColumnSet,
    public readonly processInstanceId: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateQuoteFromOpportunity`;

    const body: Record<string, unknown> = {
      OpportunityId: this.opportunityId,
      ColumnSet: this.columnSet,
      ProcessInstanceId: this.processInstanceId,
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

  async parseResponse(response: Response): Promise<GenerateQuoteFromOpportunityResponse> {
    const data = await response.json();
    return data as GenerateQuoteFromOpportunityResponse;
  }
}
