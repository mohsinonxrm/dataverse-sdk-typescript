import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    public readonly count: number | undefined,
    public readonly target: EntityReference | AnyEntityPayload
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrieveKnowledgeSuggestionsResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveKnowledgeSuggestionsResponse;
  }
}
