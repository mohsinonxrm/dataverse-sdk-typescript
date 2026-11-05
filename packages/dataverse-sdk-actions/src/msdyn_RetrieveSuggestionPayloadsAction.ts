import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_RetrieveSuggestionPayloads action
 */
export interface msdyn_RetrieveSuggestionPayloadsResponse {
  value: EntityReference[];
}

/**
 * msdyn_RetrieveSuggestionPayloads action
 *
 * Unbound action
 */
export class msdyn_RetrieveSuggestionPayloadsAction implements Executable<msdyn_RetrieveSuggestionPayloadsResponse> {
  constructor(
    public readonly suggestionFor: EntityReference,
    public readonly context: string,
    public readonly suggestionType: string,
    public readonly languageLocales: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveSuggestionPayloads`;

    const body: Record<string, unknown> = {
      SuggestionFor: this.suggestionFor,
      Context: this.context,
      SuggestionType: this.suggestionType,
      LanguageLocales: this.languageLocales,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveSuggestionPayloadsResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveSuggestionPayloadsResponse;
  }
}
