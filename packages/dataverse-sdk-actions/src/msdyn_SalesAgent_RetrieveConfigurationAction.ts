import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgent_RetrieveConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgent_RetrieveConfigurationResponse {
  "@odata.context"?: string;
  FeatureName: string;
  Fields: string;
  Message: string;
  ProfileId: string;
  Success: boolean;
}

/**
 * Parameters of the msdyn_SalesAgent_RetrieveConfiguration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgent_RetrieveConfigurationActionParameters {
  Fields?: string[];
  ProfileId?: string;
  FeatureName: string;
}

/**
 * msdyn_SalesAgent_RetrieveConfiguration action
 *
 * Unbound action
 */
export class msdyn_SalesAgent_RetrieveConfigurationAction implements Executable<msdyn_SalesAgent_RetrieveConfigurationResponse> {
  constructor(public readonly parameters: msdyn_SalesAgent_RetrieveConfigurationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgent_RetrieveConfiguration`;

    const body = requestBody({
      Fields: this.parameters.Fields,
      ProfileId: this.parameters.ProfileId,
      FeatureName: this.parameters.FeatureName,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgent_RetrieveConfigurationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgent_RetrieveConfigurationResponse;
  }
}
