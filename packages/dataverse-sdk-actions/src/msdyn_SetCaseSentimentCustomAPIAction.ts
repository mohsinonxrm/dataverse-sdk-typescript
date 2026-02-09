import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SetCaseSentimentCustomAPI action
 */
export interface msdyn_SetCaseSentimentCustomAPIResponse {
  // No content returned
}

/**
 * msdyn_SetCaseSentimentCustomAPI action
 *
 * Unbound action
 */
export class msdyn_SetCaseSentimentCustomAPIAction implements Executable<msdyn_SetCaseSentimentCustomAPIResponse> {
  constructor(public readonly emailId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetCaseSentimentCustomAPI`;

    const body: Record<string, unknown> = {
      emailId: this.emailId,
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

  async parseResponse(response: Response): Promise<msdyn_SetCaseSentimentCustomAPIResponse> {
    // No return value (204 No Content)
    return {};
  }
}
