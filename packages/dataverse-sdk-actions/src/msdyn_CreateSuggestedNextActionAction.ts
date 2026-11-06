import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_CreateSuggestedNextAction action
 */
export interface msdyn_CreateSuggestedNextActionResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_CreateSuggestedNextAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateSuggestedNextActionActionParameters {
  SuggestionSubtype: string;
  Entity?: EntityReference | AnyEntityPayload;
  DraftEmailId: string;
  SuggestionType: string;
}

/**
 * msdyn_CreateSuggestedNextAction action
 *
 * Unbound action
 */
export class msdyn_CreateSuggestedNextActionAction implements Executable<msdyn_CreateSuggestedNextActionResponse> {
  constructor(public readonly parameters: msdyn_CreateSuggestedNextActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSuggestedNextAction`;

    const body = requestBody({
      SuggestionSubtype: this.parameters.SuggestionSubtype,
      Entity: this.parameters.Entity,
      DraftEmailId: this.parameters.DraftEmailId,
      SuggestionType: this.parameters.SuggestionType,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSuggestedNextActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CreateSuggestedNextActionResponse;
  }
}
