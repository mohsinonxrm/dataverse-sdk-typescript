import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CleanUpEmailNBACardsPlugin action
 */
export interface msdyn_CleanUpEmailNBACardsPluginResponse {
  // No content returned
}

/**
 * msdyn_CleanUpEmailNBACardsPlugin action
 *
 * Unbound action
 */
export class msdyn_CleanUpEmailNBACardsPluginAction implements Executable<msdyn_CleanUpEmailNBACardsPluginResponse> {
  constructor(public readonly inputData?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanUpEmailNBACardsPlugin`;

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

  async parseResponse(response: Response): Promise<msdyn_CleanUpEmailNBACardsPluginResponse> {
    // No return value (204 No Content)
    return {};
  }
}
