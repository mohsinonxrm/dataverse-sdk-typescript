import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_RetrieveCadenceSuggestions action
 */
export interface msdyn_RetrieveCadenceSuggestionsResponse {
  Suggestions: string;
}

/**
 * Parameters of the msdyn_RetrieveCadenceSuggestions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveCadenceSuggestionsActionParameters {
  EntityReference: EntityReference | AnyEntityPayload;
  ActivityType: number;
  LinkedActivityId?: string;
  StepType: number;
}

/**
 * msdyn_RetrieveCadenceSuggestions action
 *
 * Unbound action
 */
export class msdyn_RetrieveCadenceSuggestionsAction implements Executable<msdyn_RetrieveCadenceSuggestionsResponse> {
  constructor(public readonly parameters: msdyn_RetrieveCadenceSuggestionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveCadenceSuggestions`;

    const body = requestBody({
      EntityReference: this.parameters.EntityReference,
      ActivityType: this.parameters.ActivityType,
      LinkedActivityId: this.parameters.LinkedActivityId,
      StepType: this.parameters.StepType,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveCadenceSuggestionsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RetrieveCadenceSuggestionsResponse;
  }
}
