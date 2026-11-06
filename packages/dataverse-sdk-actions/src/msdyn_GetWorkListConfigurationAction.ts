import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetWorkListConfiguration action
 */
export interface msdyn_GetWorkListConfigurationResponse {
  IsEnabledForUser: boolean;
  SettingsInstance: string;
  ViewsList: string;
}

/**
 * Parameters of the msdyn_GetWorkListConfiguration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetWorkListConfigurationActionParameters {
  Viewtype?: string;
  GetData?: boolean;
  DefaultViewType?: string;
  QueryParams?: string;
}

/**
 * msdyn_GetWorkListConfiguration action
 *
 * Unbound action
 */
export class msdyn_GetWorkListConfigurationAction implements Executable<msdyn_GetWorkListConfigurationResponse> {
  constructor(public readonly parameters: msdyn_GetWorkListConfigurationActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetWorkListConfiguration`;

    const body = requestBody({
      Viewtype: this.parameters.Viewtype,
      GetData: this.parameters.GetData,
      DefaultViewType: this.parameters.DefaultViewType,
      QueryParams: this.parameters.QueryParams,
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

  async parseResponse(response: Response): Promise<msdyn_GetWorkListConfigurationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetWorkListConfigurationResponse;
  }
}
