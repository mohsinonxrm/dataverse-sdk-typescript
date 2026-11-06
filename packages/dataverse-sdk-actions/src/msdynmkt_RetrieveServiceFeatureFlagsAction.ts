import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_RetrieveServiceFeatureFlags action
 */
export interface msdynmkt_RetrieveServiceFeatureFlagsResponse {
  ResultText: string;
  StatusCode: number;
}

/**
 * Parameters of the msdynmkt_RetrieveServiceFeatureFlags action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_RetrieveServiceFeatureFlagsActionParameters {
  ServiceName?: string;
}

/**
 * msdynmkt_RetrieveServiceFeatureFlags action
 *
 * Unbound action
 */
export class msdynmkt_RetrieveServiceFeatureFlagsAction implements Executable<msdynmkt_RetrieveServiceFeatureFlagsResponse> {
  constructor(
    public readonly parameters: msdynmkt_RetrieveServiceFeatureFlagsActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_RetrieveServiceFeatureFlags`;

    const body = requestBody({
      ServiceName: this.parameters.ServiceName,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_RetrieveServiceFeatureFlagsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_RetrieveServiceFeatureFlagsResponse;
  }
}
