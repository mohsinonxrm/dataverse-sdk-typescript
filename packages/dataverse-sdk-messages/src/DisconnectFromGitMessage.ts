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
    // The body is the complex value, with its @odata.context
    return DisconnectFromGitResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DisconnectFromGit action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DisconnectFromGitResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * DisconnectFromGit response message
 *
 * `result` is the value the DisconnectFromGit action returns (see {@link DisconnectFromGitResult}).
 */
export class DisconnectFromGitResponse extends OrganizationResponse {
  constructor(public result: DisconnectFromGitResult) {
    super("DisconnectFromGit");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DisconnectFromGitResponse {
    return new DisconnectFromGitResponse(data as DisconnectFromGitResult);
  }
}
