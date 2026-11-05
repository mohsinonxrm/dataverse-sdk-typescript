import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RefreshChangesFromGit request message
 *
 * Web API Action: RefreshChangesFromGit
 */
export class RefreshChangesFromGitRequest
  extends OrganizationRequest
  implements Executable<RefreshChangesFromGitResponse>
{
  constructor(public solutionUniqueName: string) {
    super("RefreshChangesFromGit");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RefreshChangesFromGit`;

    const body: Record<string, unknown> = {
      SolutionUniqueName: this.solutionUniqueName,
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

  async parseResponse(response: Response): Promise<RefreshChangesFromGitResponse> {
    // No return value (204 No Content)
    return new RefreshChangesFromGitResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionUniqueName: this.solutionUniqueName,
    };
  }
}

/**
 * RefreshChangesFromGit response message
 */
export class RefreshChangesFromGitResponse extends OrganizationResponse {
  constructor() {
    super("RefreshChangesFromGit");
  }

  static fromResponse(_data: unknown): RefreshChangesFromGitResponse {
    return new RefreshChangesFromGitResponse();
  }
}
