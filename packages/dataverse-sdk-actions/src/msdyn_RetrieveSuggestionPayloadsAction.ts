import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_RetrieveSuggestionPayloads action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_RetrieveSuggestionPayloadsResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the msdyn_RetrieveSuggestionPayloads action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveSuggestionPayloadsActionParameters {
  SuggestionFor: EntityReference | AnyEntityPayload;
  Context?: string;
  SuggestionType?: string;
  LanguageLocales?: string;
}

/**
 * msdyn_RetrieveSuggestionPayloads action
 *
 * Unbound action
 */
export class msdyn_RetrieveSuggestionPayloadsAction implements Executable<msdyn_RetrieveSuggestionPayloadsResponse> {
  constructor(public readonly parameters: msdyn_RetrieveSuggestionPayloadsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveSuggestionPayloads`;

    const body = requestBody({
      SuggestionFor: this.parameters.SuggestionFor,
      Context: this.parameters.Context,
      SuggestionType: this.parameters.SuggestionType,
      LanguageLocales: this.parameters.LanguageLocales,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveSuggestionPayloadsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: msdyn_RetrieveSuggestionPayloadsResponse }).value;
  }
}
