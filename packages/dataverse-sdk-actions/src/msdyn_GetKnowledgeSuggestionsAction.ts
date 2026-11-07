import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_GetKnowledgeSuggestions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetKnowledgeSuggestionsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetKnowledgeSuggestionsResponse;
  }
}
