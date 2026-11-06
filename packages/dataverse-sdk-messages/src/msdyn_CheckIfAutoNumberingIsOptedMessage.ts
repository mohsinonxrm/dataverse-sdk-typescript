import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfAutoNumberingIsOptedResponse as msdyn_CheckIfAutoNumberingIsOptedResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfAutoNumberingIsOpted request message
 *
 * Web API Action: msdyn_CheckIfAutoNumberingIsOpted
 */
export class msdyn_CheckIfAutoNumberingIsOptedRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfAutoNumberingIsOptedResponse>
{
  constructor(public solutionId: string) {
    super("msdyn_CheckIfAutoNumberingIsOpted");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfAutoNumberingIsOpted`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckIfAutoNumberingIsOptedResponse> {
    const data = await response.json();
    return msdyn_CheckIfAutoNumberingIsOptedResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckIfAutoNumberingIsOpted response message
 */
export class msdyn_CheckIfAutoNumberingIsOptedResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfAutoNumberingIsOptedResponseData) {
    super("msdyn_CheckIfAutoNumberingIsOpted");
  }

  static fromResponse(data: unknown): msdyn_CheckIfAutoNumberingIsOptedResponse {
    return new msdyn_CheckIfAutoNumberingIsOptedResponse(
      responseObject<msdyn_CheckIfAutoNumberingIsOptedResponseData>(data)
    );
  }
}
