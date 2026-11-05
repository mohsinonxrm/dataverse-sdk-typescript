import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_PollODOSForConsent action
 */
export interface msdyn_PollODOSForConsentResponse {
  // No content returned
}

/**
 * msdyn_PollODOSForConsent action
 *
 * Unbound action
 */
export class msdyn_PollODOSForConsentAction implements Executable<msdyn_PollODOSForConsentResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PollODOSForConsent`;

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

  async parseResponse(response: Response): Promise<msdyn_PollODOSForConsentResponse> {
    // No return value (204 No Content)
    return {};
  }
}
