import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_PredefinedPlaceholderAddCount action
 */
export interface msdynmkt_PredefinedPlaceholderAddCountResponse {
  // No content returned
}

/**
 * msdynmkt_PredefinedPlaceholderAddCount action
 *
 * Unbound action
 */
export class msdynmkt_PredefinedPlaceholderAddCountAction implements Executable<msdynmkt_PredefinedPlaceholderAddCountResponse> {
  constructor(public readonly predefinedPlaceholderAddCountRequest?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PredefinedPlaceholderAddCount`;

    const body: Record<string, unknown> = {
      PredefinedPlaceholderAddCountRequest: this.predefinedPlaceholderAddCountRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_PredefinedPlaceholderAddCountResponse> {
    // No return value (204 No Content)
    return {};
  }
}
