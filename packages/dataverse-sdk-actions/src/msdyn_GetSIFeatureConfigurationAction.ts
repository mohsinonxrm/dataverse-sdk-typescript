import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetSIFeatureConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSIFeatureConfigurationResponse {
  "@odata.context"?: string;
  FeatureConfiguration: string;
}

/**
 * Parameters of the msdyn_GetSIFeatureConfiguration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSIFeatureConfigurationActionParameters {
  SIParameters: string;
  OrgMigratedToCoreServices?: boolean;
}

/**
 * msdyn_GetSIFeatureConfiguration action
 *
 * Unbound action
 */
export class msdyn_GetSIFeatureConfigurationAction implements Executable<msdyn_GetSIFeatureConfigurationResponse> {
  constructor(public readonly parameters: msdyn_GetSIFeatureConfigurationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSIFeatureConfiguration`;

    const body = requestBody({
      SIParameters: this.parameters.SIParameters,
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

  async parseResponse(response: Response): Promise<msdyn_GetSIFeatureConfigurationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetSIFeatureConfigurationResponse;
  }
}
