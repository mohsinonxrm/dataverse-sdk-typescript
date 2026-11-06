import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunity } from "./types/index.js";

/**
 * Parameters of the GetInvoiceProductsFromOpportunity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetInvoiceProductsFromOpportunityRequestParameters {
  Opportunity: EntityReference | EntityPayload<opportunity>;
}

/**
 * GetInvoiceProductsFromOpportunity request message
 *
 * Web API Action: GetInvoiceProductsFromOpportunity
 *
 * The first argument is the id of the invoice record to call it on.
 */
export class GetInvoiceProductsFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GetInvoiceProductsFromOpportunityResponse>
{
  declare readonly Parameters: Readonly<GetInvoiceProductsFromOpportunityRequestParameters>;

  constructor(
    public invoiceId: string,
    parameters: GetInvoiceProductsFromOpportunityRequestParameters
  ) {
    super("GetInvoiceProductsFromOpportunity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/invoices(${this.invoiceId})/Microsoft.Dynamics.CRM.GetInvoiceProductsFromOpportunity`;

    const body = requestBody({
      Opportunity: this.Parameters.Opportunity,
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
    // No return value (204 No Content)
    return Promise.resolve(new GetInvoiceProductsFromOpportunityResponse());
  }
}

/**
 * GetInvoiceProductsFromOpportunity response message
 */
export class GetInvoiceProductsFromOpportunityResponse extends OrganizationResponse {
  constructor() {
    super("GetInvoiceProductsFromOpportunity");
  }

  static fromResponse(_data?: unknown): GetInvoiceProductsFromOpportunityResponse {
    return new GetInvoiceProductsFromOpportunityResponse();
  }
}
