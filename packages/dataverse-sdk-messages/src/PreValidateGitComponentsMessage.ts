import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { PreValidateGitComponentsResponse as PreValidateGitComponentsResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return PreValidateGitComponentsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * PreValidateGitComponents response message
 */
export class PreValidateGitComponentsResponse extends OrganizationResponse {
  constructor(public result: PreValidateGitComponentsResponseData) {
    super("PreValidateGitComponents");
  }

  static fromResponse(data: unknown): PreValidateGitComponentsResponse {
    return new PreValidateGitComponentsResponse(
      responseObject<PreValidateGitComponentsResponseData>(data)
    );
  }
}
