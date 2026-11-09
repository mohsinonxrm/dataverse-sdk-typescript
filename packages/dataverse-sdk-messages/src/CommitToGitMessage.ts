import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CommitToGitResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CommitToGit action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CommitToGitResult {
  "@odata.context"?: string;
  CommitId: string;
  Type: number;
}

/**
 * CommitToGit response message
 *
 * `result` is the value the CommitToGit action returns (see {@link CommitToGitResult}).
 */
export class CommitToGitResponse extends OrganizationResponse {
  constructor(public result: CommitToGitResult) {
    super("CommitToGit");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CommitToGitResponse {
    return new CommitToGitResponse(data as CommitToGitResult);
  }
}
