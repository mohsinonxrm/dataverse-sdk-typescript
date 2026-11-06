import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunityclose } from "./types/index.js";

/**
 * Response from the WinOpportunity action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type WinOpportunityResponse = void;

/**
 * Parameters of the WinOpportunity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface WinOpportunityActionParameters {
  OpportunityClose: EntityReference | EntityPayload<opportunityclose>;
  Caller?: string;
  Status: number;
}

/**
 * WinOpportunity action
 *
 * Unbound action
 */
export class WinOpportunityAction implements Executable<WinOpportunityResponse> {
  constructor(public readonly parameters: WinOpportunityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/WinOpportunity`;

    const body = requestBody({
      OpportunityClose: this.parameters.OpportunityClose,
      Caller: this.parameters.Caller,
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

  parseResponse(_response: Response): Promise<WinOpportunityResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
