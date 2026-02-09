import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IsSSSEnabled action
 */
export interface msdyn_IsSSSEnabledResponse {
  IsSSSEnabled: boolean;
}

/**
 * msdyn_IsSSSEnabled action
 *
 * Unbound action
 */
export class msdyn_IsSSSEnabledAction implements Executable<msdyn_IsSSSEnabledResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsSSSEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsSSSEnabledResponse> {
    const data = await response.json();
    return data as msdyn_IsSSSEnabledResponse;
  }
}
