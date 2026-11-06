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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_EnableSharePointResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_EnableSharePointResponse;
    return (await response.json()) as msdyn_EnableSharePointResponse;
  }
}
