import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { ColumnSet } from "./types/index.js";

/**
 * GenerateQuoteFromOpportunity request message
 *
 * Web API Action: GenerateQuoteFromOpportunity
 */
export class GenerateQuoteFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GenerateQuoteFromOpportunityResponse>
{
  constructor(
    public opportunityId: string,
    public columnSet: ColumnSet,
    public processInstanceId: EntityReference
  ) {
    super("GenerateQuoteFromOpportunity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateQuoteFromOpportunity`;

    const body: Record<string, unknown> = {
      OpportunityId: this.opportunityId,
      ColumnSet: this.columnSet,
      ProcessInstanceId: this.processInstanceId,
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

  async parseResponse(response: Response): Promise<GenerateQuoteFromOpportunityResponse> {
    const data = await response.json();
    return GenerateQuoteFromOpportunityResponse.fromResponse(data);
  }
}

/**
 * GenerateQuoteFromOpportunity response message
 */
export class GenerateQuoteFromOpportunityResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("GenerateQuoteFromOpportunity");
  }

  static fromResponse(data: unknown): GenerateQuoteFromOpportunityResponse {
    return new GenerateQuoteFromOpportunityResponse(responseObject<Record<string, unknown>>(data));
  }
}
