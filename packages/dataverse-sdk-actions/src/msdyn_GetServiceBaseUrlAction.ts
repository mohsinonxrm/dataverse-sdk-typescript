import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetServiceBaseUrl action
 */
export interface msdyn_GetServiceBaseUrlResponse {
  BaseUrl: string;
}

/**
 * msdyn_GetServiceBaseUrl action
 *
 * Unbound action
 */
export class msdyn_GetServiceBaseUrlAction implements Executable<msdyn_GetServiceBaseUrlResponse> {
  constructor(
    public readonly azureApplicationType: number,
    public readonly orgMigratedToCoreServices: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetServiceBaseUrl`;

    const body: Record<string, unknown> = {
      AzureApplicationType: this.azureApplicationType,
      OrgMigratedToCoreServices: this.orgMigratedToCoreServices,
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

  async parseResponse(response: Response): Promise<msdyn_GetServiceBaseUrlResponse> {
    const data = await response.json();
    return data as msdyn_GetServiceBaseUrlResponse;
  }
}
