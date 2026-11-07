import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_CreateSuggestedNextAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateSuggestedNextActionResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_CreateSuggestedNextAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateSuggestedNextActionActionParameters {
  Entity?: EntityReference | AnyEntityPayload;
  SuggestionSubtype: string;
  RunId?: string;
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
      Entity: this.parameters.Entity,
      SuggestionSubtype: this.parameters.SuggestionSubtype,
      RunId: this.parameters.RunId,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CreateSuggestedNextActionResponse;
  }
}
