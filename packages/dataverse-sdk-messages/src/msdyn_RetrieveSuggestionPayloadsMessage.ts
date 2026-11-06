import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return msdyn_RetrieveSuggestionPayloadsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_RetrieveSuggestionPayloadsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveSuggestionPayloads action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_RetrieveSuggestionPayloadsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_RetrieveSuggestionPayloads response message
 *
 * `result` is the value the msdyn_RetrieveSuggestionPayloads action returns (see {@link msdyn_RetrieveSuggestionPayloadsResult}).
 */
export class msdyn_RetrieveSuggestionPayloadsResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveSuggestionPayloadsResult) {
    super("msdyn_RetrieveSuggestionPayloads");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveSuggestionPayloadsResponse {
    return new msdyn_RetrieveSuggestionPayloadsResponse(
      data === undefined ? [] : (data as { value: msdyn_RetrieveSuggestionPayloadsResult }).value
    );
  }
}
