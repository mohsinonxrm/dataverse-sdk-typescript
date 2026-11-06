import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AnalyticsSaveDataInConfigStore action
 */
export interface msdyn_AnalyticsSaveDataInConfigStoreResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_AnalyticsSaveDataInConfigStore action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AnalyticsSaveDataInConfigStoreActionParameters {
  Key: string;
  Value: string;
  ConfigName?: string;
}

/**
 * msdyn_AnalyticsSaveDataInConfigStore action
 *
 * Unbound action
 */
export class msdyn_AnalyticsSaveDataInConfigStoreAction implements Executable<msdyn_AnalyticsSaveDataInConfigStoreResponse> {
  constructor(public readonly parameters: msdyn_AnalyticsSaveDataInConfigStoreActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AnalyticsSaveDataInConfigStore`;

    const body = requestBody({
      Key: this.parameters.Key,
      Value: this.parameters.Value,
      ConfigName: this.parameters.ConfigName,
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

  async parseResponse(response: Response): Promise<msdyn_AnalyticsSaveDataInConfigStoreResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_AnalyticsSaveDataInConfigStoreResponse;
  }
}
