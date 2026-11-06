import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunity } from "./types/index.js";

/**
 * Response from the GetInvoiceProductsFromOpportunity action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type GetInvoiceProductsFromOpportunityResponse = void;

/**
 * Parameters of the GetInvoiceProductsFromOpportunity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetInvoiceProductsFromOpportunityActionParameters {
  Opportunity: EntityReference | EntityPayload<opportunity>;
}

/**
 * GetInvoiceProductsFromOpportunity action
 *
 * Bound action
 * Binding parameter: entity (mscrm.invoice)
 *
 * The first argument is the id of the invoice record to call it on.
 */
export class GetInvoiceProductsFromOpportunityAction implements Executable<GetInvoiceProductsFromOpportunityResponse> {
  constructor(
    public readonly invoiceId: string,
    public readonly parameters: GetInvoiceProductsFromOpportunityActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/invoices(${this.invoiceId})/Microsoft.Dynamics.CRM.GetInvoiceProductsFromOpportunity`;

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

  parseResponse(_response: Response): Promise<GetInvoiceProductsFromOpportunityResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
