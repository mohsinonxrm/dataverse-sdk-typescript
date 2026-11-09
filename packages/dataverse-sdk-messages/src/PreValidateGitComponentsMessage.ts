import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the PreValidateGitComponents message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PreValidateGitComponentsRequestParameters {
  SolutionUniqueName: string;
  IsRetriableOnly?: boolean;
}

/**
 * PreValidateGitComponents request message
 *
 * Web API Action: PreValidateGitComponents
 */
export class PreValidateGitComponentsRequest
  extends OrganizationRequest
  implements Executable<PreValidateGitComponentsResponse>
{
  declare readonly Parameters: Readonly<PreValidateGitComponentsRequestParameters>;

  constructor(parameters: PreValidateGitComponentsRequestParameters) {
    super("PreValidateGitComponents", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PreValidateGitComponents`;

    const body = requestBody({
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      IsRetriableOnly: this.Parameters.IsRetriableOnly,
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

  async parseResponse(response: Response): Promise<PreValidateGitComponentsResponse> {
    // The body is the complex value, with its @odata.context
    return PreValidateGitComponentsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PreValidateGitComponents action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PreValidateGitComponentsResult {
  "@odata.context"?: string;
  ValidationMessages: string;
}

/**
 * PreValidateGitComponents response message
 *
 * `result` is the value the PreValidateGitComponents action returns (see {@link PreValidateGitComponentsResult}).
 */
export class PreValidateGitComponentsResponse extends OrganizationResponse {
  constructor(public result: PreValidateGitComponentsResult) {
    super("PreValidateGitComponents");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PreValidateGitComponentsResponse {
    return new PreValidateGitComponentsResponse(data as PreValidateGitComponentsResult);
  }
}
