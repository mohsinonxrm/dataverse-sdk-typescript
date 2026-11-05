import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateActionFlow action
 */
export interface msdyn_CreateActionFlowResponse {
  // No content returned
}

/**
 * msdyn_CreateActionFlow action
 *
 * Unbound action
 */
export class msdyn_CreateActionFlowAction implements Executable<msdyn_CreateActionFlowResponse> {
  constructor(public readonly sLAId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateActionFlow`;

    const body: Record<string, unknown> = {
      SLAId: this.sLAId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateActionFlowResponse> {
    // No return value (204 No Content)
    return {};
  }
}
