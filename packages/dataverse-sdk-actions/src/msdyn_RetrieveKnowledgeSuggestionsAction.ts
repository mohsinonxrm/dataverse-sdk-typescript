import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_RetrieveKnowledgeSuggestions action
 */
export interface msdyn_RetrieveKnowledgeSuggestionsResponse {
  Result: string;
}

/**
 * msdyn_RetrieveKnowledgeSuggestions action
 *
 * Unbound action
 */
export class msdyn_RetrieveKnowledgeSuggestionsAction implements Executable<msdyn_RetrieveKnowledgeSuggestionsResponse> {
  constructor(
    public readonly count: number,
    public readonly target: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKnowledgeSuggestions`;

    const body: Record<string, unknown> = {
      Count: this.count,
      Target: this.target,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKnowledgeSuggestionsResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveKnowledgeSuggestionsResponse;
  }
}
