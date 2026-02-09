import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_RetrieveServiceFeatureFlags action
 */
export interface msdynmkt_RetrieveServiceFeatureFlagsResponse {
  ResultText: string;
  StatusCode: number;
}

/**
 * msdynmkt_RetrieveServiceFeatureFlags action
 *
 * Unbound action
 */
export class msdynmkt_RetrieveServiceFeatureFlagsAction implements Executable<msdynmkt_RetrieveServiceFeatureFlagsResponse> {
  constructor(public readonly serviceName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_RetrieveServiceFeatureFlags`;

    const body: Record<string, unknown> = {
      ServiceName: this.serviceName,
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

  async parseResponse(response: Response): Promise<msdynmkt_RetrieveServiceFeatureFlagsResponse> {
    const data = await response.json();
    return data as msdynmkt_RetrieveServiceFeatureFlagsResponse;
  }
}
