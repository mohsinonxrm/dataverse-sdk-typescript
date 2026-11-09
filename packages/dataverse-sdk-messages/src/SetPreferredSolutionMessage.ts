import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the SetPreferredSolution message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetPreferredSolutionRequestParameters {
  SolutionId: string;
}

/**
 * SetPreferredSolution request message
 *
 * Web API Action: SetPreferredSolution
 */
export class SetPreferredSolutionRequest
  extends OrganizationRequest
  implements Executable<SetPreferredSolutionResponse>
{
  declare readonly Parameters: Readonly<SetPreferredSolutionRequestParameters>;

  constructor(parameters: SetPreferredSolutionRequestParameters) {
    super("SetPreferredSolution", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetPreferredSolution`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
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

  parseResponse(_response: Response): Promise<SetPreferredSolutionResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new SetPreferredSolutionResponse());
  }
}

/**
 * SetPreferredSolution response message
 */
export class SetPreferredSolutionResponse extends OrganizationResponse {
  constructor() {
    super("SetPreferredSolution");
  }

  static fromResponse(_data?: unknown): SetPreferredSolutionResponse {
    return new SetPreferredSolutionResponse();
  }
}
