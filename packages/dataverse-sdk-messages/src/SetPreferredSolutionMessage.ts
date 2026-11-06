import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * SetPreferredSolution request message
 *
 * Web API Action: SetPreferredSolution
 */
export class SetPreferredSolutionRequest
  extends OrganizationRequest
  implements Executable<SetPreferredSolutionResponse>
{
  constructor(public solutionId: string) {
    super("SetPreferredSolution");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetPreferredSolution`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
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

  async parseResponse(response: Response): Promise<SetPreferredSolutionResponse> {
    // No return value (204 No Content)
    return new SetPreferredSolutionResponse();
  }
}

/**
 * SetPreferredSolution response message
 */
export class SetPreferredSolutionResponse extends OrganizationResponse {
  constructor() {
    super("SetPreferredSolution");
  }

  static fromResponse(_data: unknown): SetPreferredSolutionResponse {
    return new SetPreferredSolutionResponse();
  }
}
