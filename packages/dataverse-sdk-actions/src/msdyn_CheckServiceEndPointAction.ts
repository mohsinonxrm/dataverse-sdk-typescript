import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckServiceEndPoint action
 */
export interface msdyn_CheckServiceEndPointResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
}

/**
 * msdyn_CheckServiceEndPoint action
 *
 * Unbound action
 */
export class msdyn_CheckServiceEndPointAction implements Executable<msdyn_CheckServiceEndPointResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckServiceEndPoint`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckServiceEndPointResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckServiceEndPointResponse;
    return (await response.json()) as msdyn_CheckServiceEndPointResponse;
  }
}
