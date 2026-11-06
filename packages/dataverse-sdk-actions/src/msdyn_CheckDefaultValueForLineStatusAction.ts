import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckDefaultValueForLineStatus action
 */
export interface msdyn_CheckDefaultValueForLineStatusResponse {
  ReturnStatus: number;
  ResultEntities: string;
  ReturnSeverity: number;
  Message: string;
}

/**
 * msdyn_CheckDefaultValueForLineStatus action
 *
 * Unbound action
 */
export class msdyn_CheckDefaultValueForLineStatusAction implements Executable<msdyn_CheckDefaultValueForLineStatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckDefaultValueForLineStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckDefaultValueForLineStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckDefaultValueForLineStatusResponse;
  }
}
