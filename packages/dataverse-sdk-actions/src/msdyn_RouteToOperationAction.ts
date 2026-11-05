import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RouteToOperation action
 */
export interface msdyn_RouteToOperationResponse {
  // No content returned
}

/**
 * msdyn_RouteToOperation action
 *
 * Unbound action
 */
export class msdyn_RouteToOperationAction implements Executable<msdyn_RouteToOperationResponse> {
  constructor(public readonly liveWorkItemId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RouteToOperation`;

    const body: Record<string, unknown> = {
      LiveWorkItemId: this.liveWorkItemId,
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

  async parseResponse(response: Response): Promise<msdyn_RouteToOperationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
