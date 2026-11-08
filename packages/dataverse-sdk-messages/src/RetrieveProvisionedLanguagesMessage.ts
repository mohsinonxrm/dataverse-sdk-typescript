import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveProvisionedLanguages request message
 *
 * Web API Function: RetrieveProvisionedLanguages
 */
export class RetrieveProvisionedLanguagesRequest
  extends OrganizationRequest
  implements Executable<RetrieveProvisionedLanguagesResponse>
{
  constructor() {
    super("RetrieveProvisionedLanguages");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveProvisionedLanguages`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveProvisionedLanguagesResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveProvisionedLanguagesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveProvisionedLanguages function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveProvisionedLanguagesResult {
  "@odata.context"?: string;
  RetrieveProvisionedLanguages: number[];
}

/**
 * RetrieveProvisionedLanguages response message
 *
 * `result` is the value the RetrieveProvisionedLanguages function returns (see {@link RetrieveProvisionedLanguagesResult}).
 */
export class RetrieveProvisionedLanguagesResponse extends OrganizationResponse {
  constructor(public result: RetrieveProvisionedLanguagesResult) {
    super("RetrieveProvisionedLanguages");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveProvisionedLanguagesResponse {
    return new RetrieveProvisionedLanguagesResponse(data as RetrieveProvisionedLanguagesResult);
  }
}
