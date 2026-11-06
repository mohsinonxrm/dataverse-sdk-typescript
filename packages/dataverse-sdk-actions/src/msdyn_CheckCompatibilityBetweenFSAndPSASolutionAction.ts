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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse;
    return (await response.json()) as msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse;
  }
}
