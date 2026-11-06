import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgent_UpdateConfiguration action
 */
export interface msdyn_SalesAgent_UpdateConfigurationResponse {
  FeatureName: string;
  Message: string;
  ProfileId: string;
  Success: boolean;
}

/**
 * Parameters of the msdyn_SalesAgent_UpdateConfiguration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgent_UpdateConfigurationActionParameters {
  FeatureName?: string;
  ProfileId?: string;
  RequestJson: string;
}

/**
 * msdyn_SalesAgent_UpdateConfiguration action
 *
 * Unbound action
 */
export class msdyn_SalesAgent_UpdateConfigurationAction implements Executable<msdyn_SalesAgent_UpdateConfigurationResponse> {
  constructor(public readonly parameters: msdyn_SalesAgent_UpdateConfigurationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgent_UpdateConfiguration`;

    const body = requestBody({
      FeatureName: this.parameters.FeatureName,
      ProfileId: this.parameters.ProfileId,
      RequestJson: this.parameters.RequestJson,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgent_UpdateConfigurationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgent_UpdateConfigurationResponse;
    return (await response.json()) as msdyn_SalesAgent_UpdateConfigurationResponse;
  }
}
