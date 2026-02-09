import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_EnableSharePoint action
 */
export interface msdyn_EnableSharePointResponse {
  OperationResult: boolean;
}

/**
 * msdyn_EnableSharePoint action
 *
 * Unbound action
 */
export class msdyn_EnableSharePointAction implements Executable<msdyn_EnableSharePointResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableSharePoint`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_EnableSharePointResponse> {
    const data = await response.json();
    return data as msdyn_EnableSharePointResponse;
  }
}
