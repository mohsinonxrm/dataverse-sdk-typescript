import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetServiceBaseUrl action
 */
export interface msdyn_GetServiceBaseUrlResponse {
  BaseUrl: string;
}

/**
 * Parameters of the msdyn_GetServiceBaseUrl action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetServiceBaseUrlActionParameters {
  AzureApplicationType: number;
  OrgMigratedToCoreServices?: boolean;
}

/**
 * msdyn_GetServiceBaseUrl action
 *
 * Unbound action
 */
export class msdyn_GetServiceBaseUrlAction implements Executable<msdyn_GetServiceBaseUrlResponse> {
  constructor(public readonly parameters: msdyn_GetServiceBaseUrlActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetServiceBaseUrl`;

    const body = requestBody({
      AzureApplicationType: this.parameters.AzureApplicationType,
      OrgMigratedToCoreServices: this.parameters.OrgMigratedToCoreServices,
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

  async parseResponse(response: Response): Promise<msdyn_GetServiceBaseUrlResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetServiceBaseUrlResponse;
  }
}
