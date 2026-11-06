import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { ColumnSet } from "./types/index.js";

/**
 * Parameters of the GenerateSalesOrderFromOpportunity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateSalesOrderFromOpportunityRequestParameters {
  OpportunityId: string;
  ColumnSet?: ColumnSet;
}

/**
 * GenerateSalesOrderFromOpportunity request message
 *
 * Web API Action: GenerateSalesOrderFromOpportunity
 */
export class GenerateSalesOrderFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GenerateSalesOrderFromOpportunityResponse>
{
  declare readonly Parameters: Readonly<GenerateSalesOrderFromOpportunityRequestParameters>;

  constructor(parameters: GenerateSalesOrderFromOpportunityRequestParameters) {
    super("GenerateSalesOrderFromOpportunity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateSalesOrderFromOpportunity`;

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

  async parseResponse(response: Response): Promise<GenerateSalesOrderFromOpportunityResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return GenerateSalesOrderFromOpportunityResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * GenerateSalesOrderFromOpportunity response message
 */
export class GenerateSalesOrderFromOpportunityResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("GenerateSalesOrderFromOpportunity");
  }

  static fromResponse(data: unknown): GenerateSalesOrderFromOpportunityResponse {
    return new GenerateSalesOrderFromOpportunityResponse(
      responseObject<Record<string, unknown>>(data)
    );
  }
}
