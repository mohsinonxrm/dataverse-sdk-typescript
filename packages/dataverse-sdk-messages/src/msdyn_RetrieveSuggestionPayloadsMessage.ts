import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_RetrieveSuggestionPayloads message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveSuggestionPayloadsRequestParameters {
  SuggestionFor: EntityReference | AnyEntityPayload;
  Context?: string;
  SuggestionType?: string;
  LanguageLocales?: string;
}

/**
 * msdyn_RetrieveSuggestionPayloads request message
 *
 * Web API Action: msdyn_RetrieveSuggestionPayloads
 */
export class msdyn_RetrieveSuggestionPayloadsRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveSuggestionPayloadsResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveSuggestionPayloadsRequestParameters>;

  constructor(parameters: msdyn_RetrieveSuggestionPayloadsRequestParameters) {
    super("msdyn_RetrieveSuggestionPayloads", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveSuggestionPayloads`;

    const body = requestBody({
      SuggestionFor: this.Parameters.SuggestionFor,
      Context: this.Parameters.Context,
      SuggestionType: this.Parameters.SuggestionType,
      LanguageLocales: this.Parameters.LanguageLocales,
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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RetrieveSuggestionPayloadsResponse.fromResponse({});
    return msdyn_RetrieveSuggestionPayloadsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RetrieveSuggestionPayloads response message
 */
export class msdyn_RetrieveSuggestionPayloadsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_RetrieveSuggestionPayloads");
  }

  static fromResponse(data: unknown): msdyn_RetrieveSuggestionPayloadsResponse {
    return new msdyn_RetrieveSuggestionPayloadsResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
