import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CommitToGitResponse as CommitToGitResponseData } from "./types/index.js";

/**
 * Parameters of the CommitToGit message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CommitToGitRequestParameters {
  CommitMessage: string;
  SolutionUniqueName: string;
}

/**
 * CommitToGit request message
 *
 * Web API Action: CommitToGit
 */
export class CommitToGitRequest
  extends OrganizationRequest
  implements Executable<CommitToGitResponse>
{
  declare readonly Parameters: Readonly<CommitToGitRequestParameters>;

  constructor(parameters: CommitToGitRequestParameters) {
    super("CommitToGit", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitToGit`;

    const body = requestBody({
      CommitMessage: this.Parameters.CommitMessage,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
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

  async parseResponse(response: Response): Promise<CommitToGitResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CommitToGitResponse.fromResponse({});
    return CommitToGitResponse.fromResponse(await response.json());
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
