import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunity } from "./types/index.js";

/**
 * Response from GetSalesOrderProductsFromOpportunity action
 */
export interface GetSalesOrderProductsFromOpportunityResponse {
  // No content returned
}

/**
 * GetSalesOrderProductsFromOpportunity action
 *
 * Bound action
 * Binding parameter: entity (mscrm.salesorder)
 */
export class GetSalesOrderProductsFromOpportunityAction implements Executable<GetSalesOrderProductsFromOpportunityResponse> {
  constructor(
    public readonly salesorderId: string,
    public readonly opportunity: EntityReference | EntityPayload<opportunity>
  ) {}

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
    return {};
  }
}
