import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_ForecastRecalculateAsync action
 */
export interface msdyn_ForecastRecalculateAsyncResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ForecastRecalculateAsync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ForecastRecalculateAsyncActionParameters {
  ForecastInstance: EntityReference | AnyEntityPayload;
  IsRefreshHierarchy: boolean;
}

/**
 * msdyn_ForecastRecalculateAsync action
 *
 * Unbound action
 */
export class msdyn_ForecastRecalculateAsyncAction implements Executable<msdyn_ForecastRecalculateAsyncResponse> {
  constructor(public readonly parameters: msdyn_ForecastRecalculateAsyncActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastRecalculateAsync`;

    const body = requestBody({
      ForecastInstance: this.parameters.ForecastInstance,
      IsRefreshHierarchy: this.parameters.IsRefreshHierarchy,
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

  async parseResponse(response: Response): Promise<msdyn_ForecastRecalculateAsyncResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ForecastRecalculateAsyncResponse;
    return (await response.json()) as msdyn_ForecastRecalculateAsyncResponse;
  }
}
