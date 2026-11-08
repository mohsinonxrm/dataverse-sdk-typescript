import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveAvailableLanguages request message
 *
 * Web API Function: RetrieveAvailableLanguages
 */
export class RetrieveAvailableLanguagesRequest
  extends OrganizationRequest
  implements Executable<RetrieveAvailableLanguagesResponse>
{
  constructor() {
    super("RetrieveAvailableLanguages");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAvailableLanguages`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveAvailableLanguagesResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveAvailableLanguagesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAvailableLanguages function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAvailableLanguagesResult {
  "@odata.context"?: string;
  LocaleIds: number[];
}

/**
 * RetrieveAvailableLanguages response message
 *
 * `result` is the value the RetrieveAvailableLanguages function returns (see {@link RetrieveAvailableLanguagesResult}).
 */
export class RetrieveAvailableLanguagesResponse extends OrganizationResponse {
  constructor(public result: RetrieveAvailableLanguagesResult) {
    super("RetrieveAvailableLanguages");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAvailableLanguagesResponse {
    return new RetrieveAvailableLanguagesResponse(data as RetrieveAvailableLanguagesResult);
  }
}
