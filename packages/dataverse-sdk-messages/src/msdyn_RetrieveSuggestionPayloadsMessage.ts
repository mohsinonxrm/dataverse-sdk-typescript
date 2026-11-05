import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_RetrieveSuggestionPayloads request message
 *
 * Web API Action: msdyn_RetrieveSuggestionPayloads
 */
export class msdyn_RetrieveSuggestionPayloadsRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveSuggestionPayloadsResponse>
{
  constructor(
    public suggestionFor: EntityReference,
    public context: string,
    public suggestionType: string,
    public languageLocales: string
  ) {
    super("msdyn_RetrieveSuggestionPayloads");
  }

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
    return msdyn_RetrieveSuggestionPayloadsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SuggestionFor: this.suggestionFor,
      Context: this.context,
      SuggestionType: this.suggestionType,
      LanguageLocales: this.languageLocales,
    };
  }
}

/**
 * msdyn_RetrieveSuggestionPayloads response message
 */
export class msdyn_RetrieveSuggestionPayloadsResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("msdyn_RetrieveSuggestionPayloads");
  }

  static fromResponse(data: unknown): msdyn_RetrieveSuggestionPayloadsResponse {
    return new msdyn_RetrieveSuggestionPayloadsResponse((data as any).value);
  }
}
