import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
 * GenerateInvoiceFromOpportunity action
 *
 * Unbound action
 */
export class GenerateInvoiceFromOpportunityAction implements Executable<GenerateInvoiceFromOpportunityResponse> {
  constructor(
    public readonly opportunityId: string,
    public readonly columnSet: ColumnSet
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateInvoiceFromOpportunity`;

    const body: Record<string, unknown> = {
      OpportunityId: this.opportunityId,
      ColumnSet: this.columnSet,
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

  async parseResponse(response: Response): Promise<GenerateInvoiceFromOpportunityResponse> {
    const data = await response.json();
    return data as GenerateInvoiceFromOpportunityResponse;
  }
}
