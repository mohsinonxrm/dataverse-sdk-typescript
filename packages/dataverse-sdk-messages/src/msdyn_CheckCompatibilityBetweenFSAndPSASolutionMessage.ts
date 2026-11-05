import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse as msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponseData } from "./types/index.js";

/**
 * msdyn_CheckCompatibilityBetweenFSAndPSASolution request message
 *
 * Web API Action: msdyn_CheckCompatibilityBetweenFSAndPSASolution
 */
export class msdyn_CheckCompatibilityBetweenFSAndPSASolutionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse>
{
  constructor() {
    super("msdyn_CheckCompatibilityBetweenFSAndPSASolution");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckCompatibilityBetweenFSAndPSASolution`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse> {
    const data = await response.json();
    return msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckCompatibilityBetweenFSAndPSASolution response message
 */
export class msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponseData) {
    super("msdyn_CheckCompatibilityBetweenFSAndPSASolution");
  }

  static fromResponse(data: unknown): msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse {
    return new msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse(
      responseObject<msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponseData>(data)
    );
  }
}
