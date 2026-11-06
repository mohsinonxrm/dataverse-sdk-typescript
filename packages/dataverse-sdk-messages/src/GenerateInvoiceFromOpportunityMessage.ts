import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ColumnSet } from "./types/index.js";

/**
 * GenerateInvoiceFromOpportunity request message
 *
 * Web API Action: GenerateInvoiceFromOpportunity
 */
export class GenerateInvoiceFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GenerateInvoiceFromOpportunityResponse>
{
  constructor(
    public opportunityId: string,
    public columnSet?: ColumnSet
  ) {
    super("GenerateInvoiceFromOpportunity");
  }

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
    return GenerateInvoiceFromOpportunityResponse.fromResponse(data);
  }
}

/**
 * GenerateInvoiceFromOpportunity response message
 */
export class GenerateInvoiceFromOpportunityResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("GenerateInvoiceFromOpportunity");
  }

  static fromResponse(data: unknown): GenerateInvoiceFromOpportunityResponse {
    return new GenerateInvoiceFromOpportunityResponse(
      responseObject<Record<string, unknown>>(data)
    );
  }
}
