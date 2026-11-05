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
    const data = await response.json();
    return data as msdyn_CheckServiceEndPointResponse;
  }
}
