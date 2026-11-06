import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunityclose } from "./types/index.js";

/**
 * Response from LoseOpportunity action
 */
export interface LoseOpportunityResponse {
  // No content returned
}

/**
 * Parameters of the LoseOpportunity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface LoseOpportunityActionParameters {
  Caller?: string;
  OpportunityClose: EntityReference | EntityPayload<opportunityclose>;
  Status: number;
}

/**
 * LoseOpportunity action
 *
 * Unbound action
 */
export class LoseOpportunityAction implements Executable<LoseOpportunityResponse> {
  constructor(public readonly parameters: LoseOpportunityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/LoseOpportunity`;

    const body = requestBody({
      Caller: this.parameters.Caller,
      OpportunityClose: this.parameters.OpportunityClose,
      Status: this.parameters.Status,
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

  async parseResponse(response: Response): Promise<LoseOpportunityResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as LoseOpportunityResponse;
  }
}
