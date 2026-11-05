import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAzureToken action
 */
export interface msdyn_GetAzureTokenResponse {
  ExceptionMessage: string;
  Result: string;
}

/**
 * msdyn_GetAzureToken action
 *
 * Unbound action
 */
export class msdyn_GetAzureTokenAction implements Executable<msdyn_GetAzureTokenResponse> {
  constructor(public readonly inputParameter: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAzureToken`;

    const body: Record<string, unknown> = {
      InputParameter: this.inputParameter,
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

  async parseResponse(response: Response): Promise<msdyn_GetAzureTokenResponse> {
    const data = await response.json();
    return data as msdyn_GetAzureTokenResponse;
  }
}
