import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DisconnectFromGit message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DisconnectFromGitRequestParameters {
  SolutionUniqueName?: string;
}

/**
 * DisconnectFromGit request message
 *
 * Web API Action: DisconnectFromGit
 */
export class DisconnectFromGitRequest
  extends OrganizationRequest
  implements Executable<DisconnectFromGitResponse>
{
  declare readonly Parameters: Readonly<DisconnectFromGitRequestParameters>;

  constructor(parameters: DisconnectFromGitRequestParameters = {}) {
    super("DisconnectFromGit", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DisconnectFromGit`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<DisconnectFromGitResponse> {
    // No return value (204 No Content)
    return new DisconnectFromGitResponse();
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
