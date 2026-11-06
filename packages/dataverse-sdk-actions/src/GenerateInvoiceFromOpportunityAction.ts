import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { ColumnSet } from "./types/index.js";

/**
 * Response from GenerateInvoiceFromOpportunity action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface GenerateInvoiceFromOpportunityResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the GenerateInvoiceFromOpportunity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateInvoiceFromOpportunityActionParameters {
  OpportunityId: string;
  ColumnSet?: ColumnSet;
}

/**
 * GenerateInvoiceFromOpportunity action
 *
 * Unbound action
 */
export class GenerateInvoiceFromOpportunityAction implements Executable<GenerateInvoiceFromOpportunityResponse> {
  constructor(public readonly parameters: GenerateInvoiceFromOpportunityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateInvoiceFromOpportunity`;

    const body = requestBody({
      OpportunityId: this.parameters.OpportunityId,
      ColumnSet: enumBody(this.parameters.ColumnSet, "ColumnSet"),
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

  async parseResponse(response: Response): Promise<GenerateInvoiceFromOpportunityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GenerateInvoiceFromOpportunityResponse;
    return (await response.json()) as GenerateInvoiceFromOpportunityResponse;
  }
}
