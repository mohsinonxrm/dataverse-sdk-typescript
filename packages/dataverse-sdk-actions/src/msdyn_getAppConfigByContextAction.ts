import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_getAppConfigByContext action
 */
export interface msdyn_getAppConfigByContextResponse {
  AppConfigurations: string;
  AppConfigurationAssignment: string;
}

/**
 * Parameters of the msdyn_getAppConfigByContext action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getAppConfigByContextActionParameters {
  AppUniqueName: string;
  UserId?: string;
  Roles?: string;
  FormFactor?: number;
}

/**
 * msdyn_getAppConfigByContext action
 *
 * Unbound action
 */
export class msdyn_getAppConfigByContextAction implements Executable<msdyn_getAppConfigByContextResponse> {
  constructor(public readonly parameters: msdyn_getAppConfigByContextActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getAppConfigByContext`;

    const body = requestBody({
      AppUniqueName: this.parameters.AppUniqueName,
      UserId: this.parameters.UserId,
      Roles: this.parameters.Roles,
      FormFactor: this.parameters.FormFactor,
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

  async parseResponse(response: Response): Promise<msdyn_getAppConfigByContextResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_getAppConfigByContextResponse;
  }
}
