import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GenerateQuoteFromOpportunityResponse> {
    const data = await response.json();
    return GenerateQuoteFromOpportunityResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      OpportunityId: this.opportunityId,
      ColumnSet: this.columnSet,
      ProcessInstanceId: this.processInstanceId,
    };
  }
}

/**
 * GenerateQuoteFromOpportunity response message
 */
export class GenerateQuoteFromOpportunityResponse extends OrganizationResponse {
  constructor(public result: EntityReference) {
    super("GenerateQuoteFromOpportunity");
  }

  static fromResponse(data: unknown): GenerateQuoteFromOpportunityResponse {
    return new GenerateQuoteFromOpportunityResponse((data as any).value);
  }
}
