import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UninstallSolution message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UninstallSolutionRequestParameters {
  SolutionUniqueName: string;
}

/**
 * UninstallSolution request message
 *
 * Web API Action: UninstallSolution
 */
export class UninstallSolutionRequest
  extends OrganizationRequest
  implements Executable<UninstallSolutionResponse>
{
  declare readonly Parameters: Readonly<UninstallSolutionRequestParameters>;

  constructor(parameters: UninstallSolutionRequestParameters) {
    super("UninstallSolution", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UninstallSolution`;

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

  parseResponse(_response: Response): Promise<UninstallSolutionResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new UninstallSolutionResponse());
  }
}

/**
 * UninstallSolution response message
 */
export class UninstallSolutionResponse extends OrganizationResponse {
  constructor() {
    super("UninstallSolution");
  }

  static fromResponse(_data?: unknown): UninstallSolutionResponse {
    return new UninstallSolutionResponse();
  }
}
