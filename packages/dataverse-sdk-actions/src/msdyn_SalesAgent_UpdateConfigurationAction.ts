import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgent_UpdateConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgent_UpdateConfigurationResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgent_UpdateConfigurationResponse;
  }
}
