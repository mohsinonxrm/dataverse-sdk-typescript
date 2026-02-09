import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    public isRetriableOnly: boolean
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<PreValidateGitComponentsResponse> {
    const data = await response.json();
    return PreValidateGitComponentsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionUniqueName: this.solutionUniqueName,
      IsRetriableOnly: this.isRetriableOnly,
    };
  }
}

/**
 * PreValidateGitComponents response message
 */
export class PreValidateGitComponentsResponse extends OrganizationResponse {
  constructor(public result: PreValidateGitComponentsResponse) {
    super("PreValidateGitComponents");
  }

  static fromResponse(data: unknown): PreValidateGitComponentsResponse {
    return new PreValidateGitComponentsResponse((data as any).value);
  }
}
