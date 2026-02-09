import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * DisconnectFromGit request message
 *
 * Web API Action: DisconnectFromGit
 */
export class DisconnectFromGitRequest
  extends OrganizationRequest
  implements Executable<DisconnectFromGitResponse>
{
  constructor(public solutionUniqueName: string) {
    super("DisconnectFromGit");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DisconnectFromGit`;

    const body: Record<string, unknown> = {
      SolutionUniqueName: this.solutionUniqueName,
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

  async parseResponse(response: Response): Promise<DisconnectFromGitResponse> {
    // No return value (204 No Content)
    return new DisconnectFromGitResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionUniqueName: this.solutionUniqueName,
    };
  }
}

/**
 * DisconnectFromGit response message
 */
export class DisconnectFromGitResponse extends OrganizationResponse {
  constructor() {
    super("DisconnectFromGit");
  }

  static fromResponse(_data: unknown): DisconnectFromGitResponse {
    return new DisconnectFromGitResponse();
  }
}
