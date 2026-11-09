import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_DynamicForecastRetrieval action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DynamicForecastRetrievalResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_DynamicForecastRetrievalResponse;
  }
}
