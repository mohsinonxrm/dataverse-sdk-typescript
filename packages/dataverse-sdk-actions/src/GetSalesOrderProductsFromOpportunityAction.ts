import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunity } from "./types/index.js";

/**
 * Response from the GetSalesOrderProductsFromOpportunity action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type GetSalesOrderProductsFromOpportunityResponse = void;

/**
 * Parameters of the GetSalesOrderProductsFromOpportunity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetSalesOrderProductsFromOpportunityActionParameters {
  Opportunity: EntityReference | EntityPayload<opportunity>;
}

/**
 * GetSalesOrderProductsFromOpportunity action
 *
 * Bound action
 * Binding parameter: entity (mscrm.salesorder)
 *
 * The first argument is the id of the salesorder record to call it on.
 */
export class GetSalesOrderProductsFromOpportunityAction implements Executable<GetSalesOrderProductsFromOpportunityResponse> {
  constructor(
    public readonly salesorderId: string,
    public readonly parameters: GetSalesOrderProductsFromOpportunityActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/salesorders(${this.salesorderId})/Microsoft.Dynamics.CRM.GetSalesOrderProductsFromOpportunity`;

    const body = requestBody({
      Opportunity: this.parameters.Opportunity,
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

  parseResponse(_response: Response): Promise<GetSalesOrderProductsFromOpportunityResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
