import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IsSharePointEnabled action
 */
export interface msdyn_IsSharePointEnabledResponse {
  IsSharePointEnabled: boolean;
}

/**
 * msdyn_IsSharePointEnabled action
 *
 * Unbound action
 */
export class msdyn_IsSharePointEnabledAction implements Executable<msdyn_IsSharePointEnabledResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsSharePointEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsSharePointEnabledResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_IsSharePointEnabledResponse;
    return (await response.json()) as msdyn_IsSharePointEnabledResponse;
  }
}
