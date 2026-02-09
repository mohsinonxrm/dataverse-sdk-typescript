import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_CreateSuggestedNextAction action
 */
export interface msdyn_CreateSuggestedNextActionResponse {
  Result: string;
}

/**
 * msdyn_CreateSuggestedNextAction action
 *
 * Unbound action
 */
export class msdyn_CreateSuggestedNextActionAction implements Executable<msdyn_CreateSuggestedNextActionResponse> {
  constructor(
    public readonly suggestionSubtype: string,
    public readonly entity: EntityReference,
    public readonly draftEmailId: string,
    public readonly suggestionType: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSuggestedNextAction`;

    const body: Record<string, unknown> = {
      SuggestionSubtype: this.suggestionSubtype,
      Entity: this.entity,
      DraftEmailId: this.draftEmailId,
      SuggestionType: this.suggestionType,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSuggestedNextActionResponse> {
    const data = await response.json();
    return data as msdyn_CreateSuggestedNextActionResponse;
  }
}
