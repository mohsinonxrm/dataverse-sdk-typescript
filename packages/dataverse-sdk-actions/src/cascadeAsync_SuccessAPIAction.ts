import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from cascadeAsync_SuccessAPI action
 */
export interface cascadeAsync_SuccessAPIResponse {
  // No content returned
}

/**
 * cascadeAsync_SuccessAPI action
 *
 * Unbound action
 */
export class cascadeAsync_SuccessAPIAction implements Executable<cascadeAsync_SuccessAPIResponse> {
  constructor(public readonly casadeAsync_JobName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/cascadeAsync_SuccessAPI`;

    const body: Record<string, unknown> = {
      casadeAsync_JobName: this.casadeAsync_JobName,
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

  async parseResponse(response: Response): Promise<cascadeAsync_SuccessAPIResponse> {
    // No return value (204 No Content)
    return {};
  }
}
