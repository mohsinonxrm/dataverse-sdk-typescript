import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
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

  toRequestBody(): Record<string, unknown> {
    return {
      OpportunityId: this.opportunityId,
      ColumnSet: this.columnSet,
    };
  }
}

/**
 * GenerateSalesOrderFromOpportunity response message
 */
export class GenerateSalesOrderFromOpportunityResponse extends OrganizationResponse {
  constructor(public result: EntityReference) {
    super("GenerateSalesOrderFromOpportunity");
  }

  static fromResponse(data: unknown): GenerateSalesOrderFromOpportunityResponse {
    return new GenerateSalesOrderFromOpportunityResponse((data as any).value);
  }
}
