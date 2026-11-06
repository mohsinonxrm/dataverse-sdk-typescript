import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunity } from "./types/index.js";

/**
 * Parameters of the GetQuoteProductsFromOpportunity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetQuoteProductsFromOpportunityRequestParameters {
  Opportunity: EntityReference | EntityPayload<opportunity>;
}

/**
 * GetQuoteProductsFromOpportunity request message
 *
 * Web API Action: GetQuoteProductsFromOpportunity
 *
 * The first argument is the id of the quote record to call it on.
 */
export class GetQuoteProductsFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GetQuoteProductsFromOpportunityResponse>
{
  declare readonly Parameters: Readonly<GetQuoteProductsFromOpportunityRequestParameters>;

  constructor(
    public quoteId: string,
    parameters: GetQuoteProductsFromOpportunityRequestParameters
  ) {
    super("GetQuoteProductsFromOpportunity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/quotes(${this.quoteId})/Microsoft.Dynamics.CRM.GetQuoteProductsFromOpportunity`;

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

  parseResponse(_response: Response): Promise<GetQuoteProductsFromOpportunityResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new GetQuoteProductsFromOpportunityResponse());
  }
}

/**
 * GetQuoteProductsFromOpportunity response message
 */
export class GetQuoteProductsFromOpportunityResponse extends OrganizationResponse {
  constructor() {
    super("GetQuoteProductsFromOpportunity");
  }

  static fromResponse(_data?: unknown): GetQuoteProductsFromOpportunityResponse {
    return new GetQuoteProductsFromOpportunityResponse();
  }
}
