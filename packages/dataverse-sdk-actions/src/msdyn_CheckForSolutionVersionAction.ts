import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForSolutionVersion action
 */
export interface msdyn_CheckForSolutionVersionResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckForSolutionVersion action
 *
 * Unbound action
 */
export class msdyn_CheckForSolutionVersionAction implements Executable<msdyn_CheckForSolutionVersionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForSolutionVersion`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForSolutionVersionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckForSolutionVersionResponse;
    return (await response.json()) as msdyn_CheckForSolutionVersionResponse;
  }
}
