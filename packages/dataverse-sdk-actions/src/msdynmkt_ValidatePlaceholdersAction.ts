import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_ValidatePlaceholders action
 */
export interface msdynmkt_ValidatePlaceholdersResponse {
  ValidatePlaceholdersResult: string;
}

/**
 * msdynmkt_ValidatePlaceholders action
 *
 * Unbound action
 */
export class msdynmkt_ValidatePlaceholdersAction implements Executable<msdynmkt_ValidatePlaceholdersResponse> {
  constructor(public readonly validatePlaceholdersRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ValidatePlaceholders`;

    const body: Record<string, unknown> = {
      ValidatePlaceholdersRequest: this.validatePlaceholdersRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_ValidatePlaceholdersResponse> {
    const data = await response.json();
    return data as msdynmkt_ValidatePlaceholdersResponse;
  }
}
