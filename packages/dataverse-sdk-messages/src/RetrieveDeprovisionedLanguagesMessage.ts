import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveDeprovisionedLanguages request message
 *
 * Web API Function: RetrieveDeprovisionedLanguages
 */
export class RetrieveDeprovisionedLanguagesRequest
  extends OrganizationRequest
  implements Executable<RetrieveDeprovisionedLanguagesResponse>
{
  constructor() {
    super("RetrieveDeprovisionedLanguages");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDeprovisionedLanguages`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveDeprovisionedLanguagesResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveDeprovisionedLanguagesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveDeprovisionedLanguages function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveDeprovisionedLanguagesResult {
  "@odata.context"?: string;
  RetrieveDeprovisionedLanguages: number[];
}

/**
 * RetrieveDeprovisionedLanguages response message
 *
 * `result` is the value the RetrieveDeprovisionedLanguages function returns (see {@link RetrieveDeprovisionedLanguagesResult}).
 */
export class RetrieveDeprovisionedLanguagesResponse extends OrganizationResponse {
  constructor(public result: RetrieveDeprovisionedLanguagesResult) {
    super("RetrieveDeprovisionedLanguages");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveDeprovisionedLanguagesResponse {
    return new RetrieveDeprovisionedLanguagesResponse(data as RetrieveDeprovisionedLanguagesResult);
  }
}
