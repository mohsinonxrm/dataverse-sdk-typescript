import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunity } from "./types/index.js";

/**
 * Response from the GetQuoteProductsFromOpportunity action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type GetQuoteProductsFromOpportunityResponse = void;

/**
 * Parameters of the GetQuoteProductsFromOpportunity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetQuoteProductsFromOpportunityActionParameters {
  Opportunity: EntityReference | EntityPayload<opportunity>;
}

/**
 * GetQuoteProductsFromOpportunity action
 *
 * Bound action
 * Binding parameter: entity (mscrm.quote)
 *
 * The first argument is the id of the quote record to call it on.
 */
export class GetQuoteProductsFromOpportunityAction implements Executable<GetQuoteProductsFromOpportunityResponse> {
  constructor(
    public readonly quoteId: string,
    public readonly parameters: GetQuoteProductsFromOpportunityActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/quotes(${odataLiteral.guid(this.quoteId)})/Microsoft.Dynamics.CRM.GetQuoteProductsFromOpportunity`;

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

  parseResponse(_response: Response): Promise<GetQuoteProductsFromOpportunityResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
