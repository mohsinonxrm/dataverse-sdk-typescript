import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_EnableUnifiedRouting action
 */
export interface msdyn_EnableUnifiedRoutingResponse {
  // No content returned
}

/**
 * msdyn_EnableUnifiedRouting action
 *
 * Unbound action
 */
export class msdyn_EnableUnifiedRoutingAction implements Executable<msdyn_EnableUnifiedRoutingResponse> {
  constructor(public readonly enable: boolean) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableUnifiedRouting`;

    const body: Record<string, unknown> = {
      Enable: this.enable,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_EnableUnifiedRoutingResponse> {
    // No return value (204 No Content)
    return {};
  }
}
