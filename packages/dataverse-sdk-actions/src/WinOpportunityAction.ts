import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunityclose } from "./types/index.js";

/**
 * Response from WinOpportunity action
 */
export interface WinOpportunityResponse {
  // No content returned
}

/**
 * WinOpportunity action
 *
 * Unbound action
 */
export class WinOpportunityAction implements Executable<WinOpportunityResponse> {
  constructor(
    public readonly opportunityClose: EntityReference | EntityPayload<opportunityclose>,
    public readonly caller: string | undefined,
    public readonly status: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/WinOpportunity`;

    const body: Record<string, unknown> = {
      OpportunityClose: this.opportunityClose,
      Caller: this.caller,
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

  async parseResponse(response: Response): Promise<WinOpportunityResponse> {
    // No return value (204 No Content)
    return {};
  }
}
