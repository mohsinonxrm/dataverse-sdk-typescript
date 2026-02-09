import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse> {
    const data = await response.json();
    return msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckCompatibilityBetweenFSAndPSASolution response message
 */
export class msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse) {
    super("msdyn_CheckCompatibilityBetweenFSAndPSASolution");
  }

  static fromResponse(data: unknown): msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse {
    return new msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse((data as any).value);
  }
}
