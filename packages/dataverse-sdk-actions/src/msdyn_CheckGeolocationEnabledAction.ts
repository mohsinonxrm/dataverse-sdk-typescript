import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckGeolocationEnabled action
 */
export interface msdyn_CheckGeolocationEnabledResponse {
  IsEnabled: boolean;
}

/**
 * msdyn_CheckGeolocationEnabled action
 *
 * Unbound action
 */
export class msdyn_CheckGeolocationEnabledAction implements Executable<msdyn_CheckGeolocationEnabledResponse> {
  constructor(
    public readonly version: string,
    public readonly noCache: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckGeolocationEnabled`;

    const body: Record<string, unknown> = {
      Version: this.version,
      NoCache: this.noCache,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckGeolocationEnabledResponse> {
    const data = await response.json();
    return data as msdyn_CheckGeolocationEnabledResponse;
  }
}
