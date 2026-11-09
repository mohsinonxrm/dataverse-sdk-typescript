import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the RefreshChangesFromGit message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RefreshChangesFromGitRequestParameters {
  SolutionUniqueName: string;
  LastRefreshTime?: string;
}

/**
 * RefreshChangesFromGit request message
 *
 * Web API Action: RefreshChangesFromGit
 */
export class RefreshChangesFromGitRequest
  extends OrganizationRequest
  implements Executable<RefreshChangesFromGitResponse>
{
  declare readonly Parameters: Readonly<RefreshChangesFromGitRequestParameters>;

  constructor(parameters: RefreshChangesFromGitRequestParameters) {
    super("RefreshChangesFromGit", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RefreshChangesFromGit`;

    const body = requestBody({
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      LastRefreshTime: this.Parameters.LastRefreshTime,
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

  parseResponse(_response: Response): Promise<RefreshChangesFromGitResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new RefreshChangesFromGitResponse());
  }
}

/**
 * RefreshChangesFromGit response message
 */
export class RefreshChangesFromGitResponse extends OrganizationResponse {
  constructor() {
    super("RefreshChangesFromGit");
  }

  static fromResponse(_data?: unknown): RefreshChangesFromGitResponse {
    return new RefreshChangesFromGitResponse();
  }
}
