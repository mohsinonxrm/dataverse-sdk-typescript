import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveInstalledLanguagePacks request message
 *
 * Web API Function: RetrieveInstalledLanguagePacks
 */
export class RetrieveInstalledLanguagePacksRequest
  extends OrganizationRequest
  implements Executable<RetrieveInstalledLanguagePacksResponse>
{
  constructor() {
    super("RetrieveInstalledLanguagePacks");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveInstalledLanguagePacks`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveInstalledLanguagePacksResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveInstalledLanguagePacksResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveInstalledLanguagePacks function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveInstalledLanguagePacksResult {
  "@odata.context"?: string;
  RetrieveInstalledLanguagePacks: number[];
}

/**
 * RetrieveInstalledLanguagePacks response message
 *
 * `result` is the value the RetrieveInstalledLanguagePacks function returns (see {@link RetrieveInstalledLanguagePacksResult}).
 */
export class RetrieveInstalledLanguagePacksResponse extends OrganizationResponse {
  constructor(public result: RetrieveInstalledLanguagePacksResult) {
    super("RetrieveInstalledLanguagePacks");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveInstalledLanguagePacksResponse {
    return new RetrieveInstalledLanguagePacksResponse(data as RetrieveInstalledLanguagePacksResult);
  }
}
