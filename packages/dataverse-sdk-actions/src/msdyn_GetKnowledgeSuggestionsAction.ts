import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_GetKnowledgeSuggestions action
 */
export interface msdyn_GetKnowledgeSuggestionsResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_GetKnowledgeSuggestions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKnowledgeSuggestionsActionParameters {
  Count?: number;
  Target: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetKnowledgeSuggestions action
 *
 * Unbound action
 */
export class msdyn_GetKnowledgeSuggestionsAction implements Executable<msdyn_GetKnowledgeSuggestionsResponse> {
  constructor(public readonly parameters: msdyn_GetKnowledgeSuggestionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKnowledgeSuggestions`;

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

  async parseResponse(response: Response): Promise<msdyn_GetKnowledgeSuggestionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetKnowledgeSuggestionsResponse;
    return (await response.json()) as msdyn_GetKnowledgeSuggestionsResponse;
  }
}
