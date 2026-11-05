import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CommitToGitResponse as CommitToGitResponseData } from "./types/index.js";

/**
 * CommitToGit request message
 *
 * Web API Action: CommitToGit
 */
export class CommitToGitRequest
  extends OrganizationRequest
  implements Executable<CommitToGitResponse>
{
  constructor(
    public commitMessage: string,
    public solutionUniqueName: string
  ) {
    super("CommitToGit");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitToGit`;

    const body: Record<string, unknown> = {
      CommitMessage: this.commitMessage,
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

  async parseResponse(response: Response): Promise<CommitToGitResponse> {
    const data = await response.json();
    return CommitToGitResponse.fromResponse(data);
  }
}

/**
 * CommitToGit response message
 */
export class CommitToGitResponse extends OrganizationResponse {
  constructor(public result: CommitToGitResponseData) {
    super("CommitToGit");
  }

  static fromResponse(data: unknown): CommitToGitResponse {
    return new CommitToGitResponse(responseObject<CommitToGitResponseData>(data));
  }
}
