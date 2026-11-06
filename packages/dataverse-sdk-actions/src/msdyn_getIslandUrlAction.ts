import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_getIslandUrl action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getIslandUrlResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_getIslandUrl action
 *
 * Unbound action
 */
export class msdyn_getIslandUrlAction implements Executable<msdyn_getIslandUrlResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getIslandUrl`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_getIslandUrlResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_getIslandUrlResponse;
  }
}
