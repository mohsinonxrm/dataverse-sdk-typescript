import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { PullChangesFromGitParameters } from "./types/index.js";

/**
 * Parameters of the PullChangesFromGit message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PullChangesFromGitRequestParameters {
  SolutionUniqueName: string;
  AdditionalParameters?: PullChangesFromGitParameters;
}

/**
 * PullChangesFromGit request message
 *
 * Web API Action: PullChangesFromGit
 */
export class PullChangesFromGitRequest
  extends OrganizationRequest
  implements Executable<PullChangesFromGitResponse>
{
  declare readonly Parameters: Readonly<PullChangesFromGitRequestParameters>;

  constructor(parameters: PullChangesFromGitRequestParameters) {
    super("PullChangesFromGit", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PullChangesFromGit`;

    const body = requestBody({
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      AdditionalParameters: this.Parameters.AdditionalParameters,
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

  async parseResponse(response: Response): Promise<PullChangesFromGitResponse> {
    // No return value (204 No Content)
    return new PullChangesFromGitResponse();
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
