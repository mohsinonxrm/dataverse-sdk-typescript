import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { ColumnSet } from "./types/index.js";

/**
 * Response from GenerateQuoteFromOpportunity action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface GenerateQuoteFromOpportunityResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * GenerateQuoteFromOpportunity action
 *
 * Unbound action
 */
export class GenerateQuoteFromOpportunityAction implements Executable<GenerateQuoteFromOpportunityResponse> {
  constructor(
    public readonly opportunityId: string,
    public readonly columnSet?: ColumnSet,
    public readonly processInstanceId?: EntityReference | AnyEntityPayload
  ) {}

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
    return data as GenerateQuoteFromOpportunityResponse;
  }
}
