import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DeprecateODOS action
 */
export interface msdyn_DeprecateODOSResponse {
  // No content returned
}

/**
 * msdyn_DeprecateODOS action
 *
 * Unbound action
 */
export class msdyn_DeprecateODOSAction implements Executable<msdyn_DeprecateODOSResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeprecateODOS`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_DeprecateODOSResponse> {
    // No return value (204 No Content)
    return {};
  }
}
