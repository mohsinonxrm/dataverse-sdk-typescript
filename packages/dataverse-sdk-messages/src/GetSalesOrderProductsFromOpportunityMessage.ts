import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunity } from "./types/index.js";

/**
 * Parameters of the GetSalesOrderProductsFromOpportunity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetSalesOrderProductsFromOpportunityRequestParameters {
  Opportunity: EntityReference | EntityPayload<opportunity>;
}

/**
 * GetSalesOrderProductsFromOpportunity request message
 *
 * Web API Action: GetSalesOrderProductsFromOpportunity
 *
 * The first argument is the id of the salesorder record to call it on.
 */
export class GetSalesOrderProductsFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GetSalesOrderProductsFromOpportunityResponse>
{
  declare readonly Parameters: Readonly<GetSalesOrderProductsFromOpportunityRequestParameters>;

  constructor(
    public salesorderId: string,
    parameters: GetSalesOrderProductsFromOpportunityRequestParameters
  ) {
    super("GetSalesOrderProductsFromOpportunity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/salesorders(${this.salesorderId})/Microsoft.Dynamics.CRM.GetSalesOrderProductsFromOpportunity`;

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

  parseResponse(_response: Response): Promise<GetSalesOrderProductsFromOpportunityResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new GetSalesOrderProductsFromOpportunityResponse());
  }
}

/**
 * GetSalesOrderProductsFromOpportunity response message
 */
export class GetSalesOrderProductsFromOpportunityResponse extends OrganizationResponse {
  constructor() {
    super("GetSalesOrderProductsFromOpportunity");
  }

  static fromResponse(_data?: unknown): GetSalesOrderProductsFromOpportunityResponse {
    return new GetSalesOrderProductsFromOpportunityResponse();
  }
}
