import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_RetrieveSuggestionPayloads action
 */
export interface msdyn_RetrieveSuggestionPayloadsResponse {
  value: EntityReference[];
}

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RetrieveSuggestionPayloadsResponse;
  }
}
