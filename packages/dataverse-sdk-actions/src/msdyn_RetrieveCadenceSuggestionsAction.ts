import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_RetrieveCadenceSuggestions action
 */
export interface msdyn_RetrieveCadenceSuggestionsResponse {
  Suggestions: string;
}

/**
 * msdyn_RetrieveCadenceSuggestions action
 *
 * Unbound action
 */
export class msdyn_RetrieveCadenceSuggestionsAction implements Executable<msdyn_RetrieveCadenceSuggestionsResponse> {
  constructor(
    public readonly entityReference: EntityReference,
    public readonly activityType: number,
    public readonly linkedActivityId: string,
    public readonly stepType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveCadenceSuggestions`;

    const body: Record<string, unknown> = {
      EntityReference: this.entityReference,
      ActivityType: this.activityType,
      LinkedActivityId: this.linkedActivityId,
      StepType: this.stepType,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveCadenceSuggestionsResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveCadenceSuggestionsResponse;
  }
}
