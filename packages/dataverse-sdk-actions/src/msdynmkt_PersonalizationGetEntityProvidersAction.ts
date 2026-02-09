import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_PersonalizationGetEntityProviders action
 */
export interface msdynmkt_PersonalizationGetEntityProvidersResponse {
  GetProvidersResult: string;
}

/**
 * msdynmkt_PersonalizationGetEntityProviders action
 *
 * Unbound action
 */
export class msdynmkt_PersonalizationGetEntityProvidersAction implements Executable<msdynmkt_PersonalizationGetEntityProvidersResponse> {
  constructor(public readonly getProvidersRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityProviders`;

    const body: Record<string, unknown> = {
      GetProvidersRequest: this.getProvidersRequest,
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

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_PersonalizationGetEntityProvidersResponse> {
    const data = await response.json();
    return data as msdynmkt_PersonalizationGetEntityProvidersResponse;
  }
}
