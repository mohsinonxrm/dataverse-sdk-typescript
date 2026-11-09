import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AnalyticsSaveDataInConfigStore action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_AnalyticsSaveDataInConfigStoreResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_AnalyticsSaveDataInConfigStoreResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
