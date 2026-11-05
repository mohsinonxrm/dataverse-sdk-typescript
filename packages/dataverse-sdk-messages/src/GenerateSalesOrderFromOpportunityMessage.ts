import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ColumnSet } from "./types/index.js";

/**
 * GenerateSalesOrderFromOpportunity request message
 *
 * Web API Action: GenerateSalesOrderFromOpportunity
 */
export class GenerateSalesOrderFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GenerateSalesOrderFromOpportunityResponse>
{
  constructor(
    public opportunityId: string,
    public columnSet: ColumnSet
  ) {
    super("GenerateSalesOrderFromOpportunity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateSalesOrderFromOpportunity`;

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

  async parseResponse(response: Response): Promise<GenerateSalesOrderFromOpportunityResponse> {
    const data = await response.json();
    return GenerateSalesOrderFromOpportunityResponse.fromResponse(data);
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
