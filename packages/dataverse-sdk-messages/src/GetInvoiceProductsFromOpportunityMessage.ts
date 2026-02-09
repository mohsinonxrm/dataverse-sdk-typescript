import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { opportunity } from "./types/index.js";

/**
 * GetInvoiceProductsFromOpportunity request message
 *
 * Web API Action: GetInvoiceProductsFromOpportunity
 */
export class GetInvoiceProductsFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GetInvoiceProductsFromOpportunityResponse>
{
  constructor(
    public invoiceId: string,
    public opportunity: opportunity
  ) {
    super("GetInvoiceProductsFromOpportunity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/invoices(${this.invoiceId})/Microsoft.Dynamics.CRM.GetInvoiceProductsFromOpportunity`;

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

  async parseResponse(response: Response): Promise<GetInvoiceProductsFromOpportunityResponse> {
    // No return value (204 No Content)
    return new GetInvoiceProductsFromOpportunityResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.invoiceId,
      Opportunity: this.opportunity,
    };
  }
}

/**
 * GetInvoiceProductsFromOpportunity response message
 */
export class GetInvoiceProductsFromOpportunityResponse extends OrganizationResponse {
  constructor() {
    super("GetInvoiceProductsFromOpportunity");
  }

  static fromResponse(_data: unknown): GetInvoiceProductsFromOpportunityResponse {
    return new GetInvoiceProductsFromOpportunityResponse();
  }
}
