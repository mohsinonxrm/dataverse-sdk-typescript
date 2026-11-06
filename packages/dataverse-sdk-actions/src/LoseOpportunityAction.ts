import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunityclose } from "./types/index.js";

/**
 * Response from LoseOpportunity action
 */
export interface LoseOpportunityResponse {
  // No content returned
}

/**
 * LoseOpportunity action
 *
 * Unbound action
 */
export class LoseOpportunityAction implements Executable<LoseOpportunityResponse> {
  constructor(
    public readonly caller: string | undefined,
    public readonly opportunityClose: EntityReference | EntityPayload<opportunityclose>,
    public readonly status: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/LoseOpportunity`;

    const body: Record<string, unknown> = {
      Caller: this.caller,
      OpportunityClose: this.opportunityClose,
      Status: this.status,
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

  async parseResponse(response: Response): Promise<LoseOpportunityResponse> {
    // No return value (204 No Content)
    return {};
  }
}
