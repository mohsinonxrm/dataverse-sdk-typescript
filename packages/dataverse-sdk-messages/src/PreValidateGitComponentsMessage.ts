import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { PreValidateGitComponentsResponse as PreValidateGitComponentsResponseData } from "./types/index.js";

/**
 * PreValidateGitComponents request message
 *
 * Web API Action: PreValidateGitComponents
 */
export class PreValidateGitComponentsRequest
  extends OrganizationRequest
  implements Executable<PreValidateGitComponentsResponse>
{
  constructor(
    public solutionUniqueName: string,
    public isRetriableOnly?: boolean
  ) {
    super("PreValidateGitComponents");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PreValidateGitComponents`;

    const body: Record<string, unknown> = {
      SolutionUniqueName: this.solutionUniqueName,
      IsRetriableOnly: this.isRetriableOnly,
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

  async parseResponse(response: Response): Promise<PreValidateGitComponentsResponse> {
    const data = await response.json();
    return PreValidateGitComponentsResponse.fromResponse(data);
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
