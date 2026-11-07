import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_IsSharePointEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IsSharePointEnabledResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_IsSharePointEnabledResponse;
  }
}
