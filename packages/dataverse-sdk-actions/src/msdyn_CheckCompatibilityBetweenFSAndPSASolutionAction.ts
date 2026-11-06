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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse;
  }
}
