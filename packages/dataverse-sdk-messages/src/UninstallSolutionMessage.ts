import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UninstallSolution request message
 *
 * Web API Action: UninstallSolution
 */
export class UninstallSolutionRequest
  extends OrganizationRequest
  implements Executable<UninstallSolutionResponse>
{
  constructor(public solutionUniqueName: string) {
    super("UninstallSolution");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UninstallSolution`;

    const body: Record<string, unknown> = {
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

  async parseResponse(response: Response): Promise<UninstallSolutionResponse> {
    // No return value (204 No Content)
    return new UninstallSolutionResponse();
  }
}

/**
 * UninstallSolution response message
 */
export class UninstallSolutionResponse extends OrganizationResponse {
  constructor() {
    super("UninstallSolution");
  }

  static fromResponse(_data: unknown): UninstallSolutionResponse {
    return new UninstallSolutionResponse();
  }
}
