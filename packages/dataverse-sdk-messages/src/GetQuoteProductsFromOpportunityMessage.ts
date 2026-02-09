import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { opportunity } from "./types/index.js";

/**
 * GetQuoteProductsFromOpportunity request message
 *
 * Web API Action: GetQuoteProductsFromOpportunity
 */
export class GetQuoteProductsFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GetQuoteProductsFromOpportunityResponse>
{
  constructor(
    public quoteId: string,
    public opportunity: opportunity
  ) {
    super("GetQuoteProductsFromOpportunity");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GetQuoteProductsFromOpportunityResponse> {
    // No return value (204 No Content)
    return new GetQuoteProductsFromOpportunityResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.quoteId,
      Opportunity: this.opportunity,
    };
  }
}

/**
 * GetQuoteProductsFromOpportunity response message
 */
export class GetQuoteProductsFromOpportunityResponse extends OrganizationResponse {
  constructor() {
    super("GetQuoteProductsFromOpportunity");
  }

  static fromResponse(_data: unknown): GetQuoteProductsFromOpportunityResponse {
    return new GetQuoteProductsFromOpportunityResponse();
  }
}
