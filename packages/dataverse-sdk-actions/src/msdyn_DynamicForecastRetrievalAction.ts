import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DynamicForecastRetrieval action
 */
export interface msdyn_DynamicForecastRetrievalResponse {
  msdyn_dynamicForecastRetrievalResponse: string;
}

/**
 * msdyn_DynamicForecastRetrieval action
 *
 * Unbound action
 */
export class msdyn_DynamicForecastRetrievalAction implements Executable<msdyn_DynamicForecastRetrievalResponse> {
  constructor(public readonly msdyn_dynamicForecastRetrievalRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DynamicForecastRetrieval`;

    const body: Record<string, unknown> = {
      msdyn_dynamicForecastRetrievalRequest: this.msdyn_dynamicForecastRetrievalRequest,
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

  async parseResponse(response: Response): Promise<msdyn_DynamicForecastRetrievalResponse> {
    const data = await response.json();
    return data as msdyn_DynamicForecastRetrievalResponse;
  }
}
