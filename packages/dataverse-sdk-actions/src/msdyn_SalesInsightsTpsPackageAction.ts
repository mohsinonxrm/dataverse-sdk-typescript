import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesInsightsTpsPackage action
 */
export interface msdyn_SalesInsightsTpsPackageResponse {
  // No content returned
}

/**
 * msdyn_SalesInsightsTpsPackage action
 *
 * Unbound action
 */
export class msdyn_SalesInsightsTpsPackageAction implements Executable<msdyn_SalesInsightsTpsPackageResponse> {
  constructor(public readonly skipInstall: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesInsightsTpsPackage`;

    const body: Record<string, unknown> = {
      skipInstall: this.skipInstall,
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

  async parseResponse(response: Response): Promise<msdyn_SalesInsightsTpsPackageResponse> {
    // No return value (204 No Content)
    return {};
  }
}
