import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AcquireToken action
 */
export interface msdyn_AcquireTokenResponse {
  OutputParameter: string;
}

/**
 * msdyn_AcquireToken action
 *
 * Unbound action
 */
export class msdyn_AcquireTokenAction implements Executable<msdyn_AcquireTokenResponse> {
  constructor(public readonly inputParameter: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AcquireToken`;

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

  async parseResponse(response: Response): Promise<msdyn_AcquireTokenResponse> {
    const data = await response.json();
    return data as msdyn_AcquireTokenResponse;
  }
}
