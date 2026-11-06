import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { ColumnSet } from "./types/index.js";

/**
 * Parameters of the GenerateInvoiceFromOpportunity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateInvoiceFromOpportunityRequestParameters {
  OpportunityId: string;
  ColumnSet?: ColumnSet;
}

/**
 * GenerateInvoiceFromOpportunity request message
 *
 * Web API Action: GenerateInvoiceFromOpportunity
 */
export class GenerateInvoiceFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GenerateInvoiceFromOpportunityResponse>
{
  declare readonly Parameters: Readonly<GenerateInvoiceFromOpportunityRequestParameters>;

  constructor(parameters: GenerateInvoiceFromOpportunityRequestParameters) {
    super("GenerateInvoiceFromOpportunity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateInvoiceFromOpportunity`;

    const body = requestBody({
      OpportunityId: this.Parameters.OpportunityId,
      ColumnSet: enumBody(this.Parameters.ColumnSet, "ColumnSet"),
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return GenerateInvoiceFromOpportunityResponse.fromResponse(text ? JSON.parse(text) : {});
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
