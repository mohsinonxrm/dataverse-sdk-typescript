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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
