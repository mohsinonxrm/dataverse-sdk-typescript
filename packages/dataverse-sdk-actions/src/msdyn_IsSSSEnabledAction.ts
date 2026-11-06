import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_IsSSSEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IsSSSEnabledResponse {
  "@odata.context"?: string;
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsSSSEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_IsSSSEnabledResponse;
  }
}
