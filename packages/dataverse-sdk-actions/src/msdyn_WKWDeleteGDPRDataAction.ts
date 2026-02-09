import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_WKWDeleteGDPRData action
 */
export interface msdyn_WKWDeleteGDPRDataResponse {
  // No content returned
}

/**
 * msdyn_WKWDeleteGDPRData action
 *
 * Unbound action
 */
export class msdyn_WKWDeleteGDPRDataAction implements Executable<msdyn_WKWDeleteGDPRDataResponse> {
  constructor(public readonly userIds: string[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WKWDeleteGDPRData`;

    const body: Record<string, unknown> = {
      UserIds: this.userIds,
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

  async parseResponse(response: Response): Promise<msdyn_WKWDeleteGDPRDataResponse> {
    // No return value (204 No Content)
    return {};
  }
}
