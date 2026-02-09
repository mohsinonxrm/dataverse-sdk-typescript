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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForSolutionVersionResponse> {
    const data = await response.json();
    return data as msdyn_CheckForSolutionVersionResponse;
  }
}
