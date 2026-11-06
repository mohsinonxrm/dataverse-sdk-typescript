import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_DynamicForecastRetrieval action
 */
export interface msdyn_DynamicForecastRetrievalResponse {
  msdyn_dynamicForecastRetrievalResponse: string;
}

/**
 * Parameters of the msdyn_DynamicForecastRetrieval action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DynamicForecastRetrievalActionParameters {
  msdyn_dynamicForecastRetrievalRequest: string;
}

/**
 * msdyn_DynamicForecastRetrieval action
 *
 * Unbound action
 */
export class msdyn_DynamicForecastRetrievalAction implements Executable<msdyn_DynamicForecastRetrievalResponse> {
  constructor(public readonly parameters: msdyn_DynamicForecastRetrievalActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DynamicForecastRetrieval`;

    const body = requestBody({
      msdyn_dynamicForecastRetrievalRequest: this.parameters.msdyn_dynamicForecastRetrievalRequest,
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

  async parseResponse(response: Response): Promise<msdyn_DynamicForecastRetrievalResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_DynamicForecastRetrievalResponse;
    return (await response.json()) as msdyn_DynamicForecastRetrievalResponse;
  }
}
