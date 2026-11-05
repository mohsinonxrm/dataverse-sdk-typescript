import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { opportunity } from "./types/index.js";

/**
 * GetSalesOrderProductsFromOpportunity request message
 *
 * Web API Action: GetSalesOrderProductsFromOpportunity
 */
export class GetSalesOrderProductsFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GetSalesOrderProductsFromOpportunityResponse>
{
  constructor(
    public salesorderId: string,
    public opportunity: opportunity
  ) {
    super("GetSalesOrderProductsFromOpportunity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/salesorders(${this.salesorderId})/Microsoft.Dynamics.CRM.GetSalesOrderProductsFromOpportunity`;

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

  async parseResponse(response: Response): Promise<GetSalesOrderProductsFromOpportunityResponse> {
    // No return value (204 No Content)
    return new GetSalesOrderProductsFromOpportunityResponse();
  }
}

/**
 * GetSalesOrderProductsFromOpportunity response message
 */
export class GetSalesOrderProductsFromOpportunityResponse extends OrganizationResponse {
  constructor() {
    super("GetSalesOrderProductsFromOpportunity");
  }

  static fromResponse(_data: unknown): GetSalesOrderProductsFromOpportunityResponse {
    return new GetSalesOrderProductsFromOpportunityResponse();
  }
}
