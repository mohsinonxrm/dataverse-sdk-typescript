import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { PullChangesFromGitParameters } from "./types/index.js";

/**
 * PullChangesFromGit request message
 *
 * Web API Action: PullChangesFromGit
 */
export class PullChangesFromGitRequest
  extends OrganizationRequest
  implements Executable<PullChangesFromGitResponse>
{
  constructor(
    public solutionUniqueName: string,
    public additionalParameters: PullChangesFromGitParameters
  ) {
    super("PullChangesFromGit");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PullChangesFromGit`;

    const body: Record<string, unknown> = {
      SolutionUniqueName: this.solutionUniqueName,
      AdditionalParameters: this.additionalParameters,
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

  async parseResponse(response: Response): Promise<PullChangesFromGitResponse> {
    // No return value (204 No Content)
    return new PullChangesFromGitResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionUniqueName: this.solutionUniqueName,
      AdditionalParameters: this.additionalParameters,
    };
  }
}

/**
 * PullChangesFromGit response message
 */
export class PullChangesFromGitResponse extends OrganizationResponse {
  constructor() {
    super("PullChangesFromGit");
  }

  static fromResponse(_data: unknown): PullChangesFromGitResponse {
    return new PullChangesFromGitResponse();
  }
}
