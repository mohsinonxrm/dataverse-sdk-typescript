import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { DisconnectFromGitResponse as DisconnectFromGitResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return DisconnectFromGitResponse.fromResponse({});
    return DisconnectFromGitResponse.fromResponse(await response.json());
  }
}

/**
 * DisconnectFromGit response message
 */
export class DisconnectFromGitResponse extends OrganizationResponse {
  constructor(public result: DisconnectFromGitResponseData) {
    super("DisconnectFromGit");
  }

  static fromResponse(data: unknown): DisconnectFromGitResponse {
    return new DisconnectFromGitResponse(responseObject<DisconnectFromGitResponseData>(data));
  }
}
