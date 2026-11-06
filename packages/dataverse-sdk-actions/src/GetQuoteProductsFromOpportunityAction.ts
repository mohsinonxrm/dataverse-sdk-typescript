import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunity } from "./types/index.js";

/**
 * Response from GetQuoteProductsFromOpportunity action
 */
export interface GetQuoteProductsFromOpportunityResponse {
  // No content returned
}

/**
 * GetQuoteProductsFromOpportunity action
 *
 * Bound action
 * Binding parameter: entity (mscrm.quote)
 */
export class GetQuoteProductsFromOpportunityAction implements Executable<GetQuoteProductsFromOpportunityResponse> {
  constructor(
    public readonly quoteId: string,
    public readonly opportunity: EntityReference | EntityPayload<opportunity>
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/quotes(${this.quoteId})/Microsoft.Dynamics.CRM.GetQuoteProductsFromOpportunity`;

    const body: Record<string, unknown> = {
      Opportunity: this.opportunity,
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

  async parseResponse(response: Response): Promise<GetQuoteProductsFromOpportunityResponse> {
    // No return value (204 No Content)
    return {};
  }
}
