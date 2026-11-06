import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_RetrieveKnowledgeSuggestions action
 */
export interface msdyn_RetrieveKnowledgeSuggestionsResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_RetrieveKnowledgeSuggestions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKnowledgeSuggestionsActionParameters {
  Count?: number;
  Target: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_RetrieveKnowledgeSuggestions action
 *
 * Unbound action
 */
export class msdyn_RetrieveKnowledgeSuggestionsAction implements Executable<msdyn_RetrieveKnowledgeSuggestionsResponse> {
  constructor(public readonly parameters: msdyn_RetrieveKnowledgeSuggestionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKnowledgeSuggestions`;

    const body = requestBody({
      Count: this.parameters.Count,
      Target: this.parameters.Target,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKnowledgeSuggestionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RetrieveKnowledgeSuggestionsResponse;
    return (await response.json()) as msdyn_RetrieveKnowledgeSuggestionsResponse;
  }
}
