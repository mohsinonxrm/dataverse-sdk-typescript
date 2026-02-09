import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckCompatibilityBetweenFSAndPSASolution action
 */
export interface msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
  HelpLink: string;
}

/**
 * msdyn_CheckCompatibilityBetweenFSAndPSASolution action
 *
 * Unbound action
 */
export class msdyn_CheckCompatibilityBetweenFSAndPSASolutionAction implements Executable<msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse> {
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
    return data as msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse;
  }
}
