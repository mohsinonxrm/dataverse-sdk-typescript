import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetKnowledgeSuggestions action
 */
export interface msdyn_GetKnowledgeSuggestionsResponse {
  Result: string;
}

/**
 * msdyn_GetKnowledgeSuggestions action
 *
 * Unbound action
 */
export class msdyn_GetKnowledgeSuggestionsAction implements Executable<msdyn_GetKnowledgeSuggestionsResponse> {
  constructor(
    public readonly count: number,
    public readonly target: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKnowledgeSuggestions`;

    const body: Record<string, unknown> = {
      Count: this.count,
      Target: this.target,
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

  async parseResponse(response: Response): Promise<msdyn_GetKnowledgeSuggestionsResponse> {
    const data = await response.json();
    return data as msdyn_GetKnowledgeSuggestionsResponse;
  }
}
