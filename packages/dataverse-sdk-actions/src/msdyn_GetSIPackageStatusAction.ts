import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSIPackageStatus action
 */
export interface msdyn_GetSIPackageStatusResponse {
  SIPackageStatus: string;
}

/**
 * msdyn_GetSIPackageStatus action
 *
 * Unbound action
 */
export class msdyn_GetSIPackageStatusAction implements Executable<msdyn_GetSIPackageStatusResponse> {
  constructor(public readonly apiVersion?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSIPackageStatus`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
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

  async parseResponse(response: Response): Promise<msdyn_GetSIPackageStatusResponse> {
    const data = await response.json();
    return data as msdyn_GetSIPackageStatusResponse;
  }
}
