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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsSharePointEnabledResponse> {
    const data = await response.json();
    return data as msdyn_IsSharePointEnabledResponse;
  }
}
