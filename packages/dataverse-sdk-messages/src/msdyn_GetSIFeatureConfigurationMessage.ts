import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetSIFeatureConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSIFeatureConfigurationRequestParameters {
  SIParameters: string;
  OrgMigratedToCoreServices?: boolean;
}

/**
 * msdyn_GetSIFeatureConfiguration request message
 *
 * Web API Action: msdyn_GetSIFeatureConfiguration
 */
export class msdyn_GetSIFeatureConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSIFeatureConfigurationResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSIFeatureConfigurationRequestParameters>;

  constructor(parameters: msdyn_GetSIFeatureConfigurationRequestParameters) {
    super("msdyn_GetSIFeatureConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSIFeatureConfiguration`;

    const body = requestBody({
      SIParameters: this.Parameters.SIParameters,
      OrgMigratedToCoreServices: this.Parameters.OrgMigratedToCoreServices,
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
    return msdyn_GetSIFeatureConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSIFeatureConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSIFeatureConfigurationResult {
  "@odata.context"?: string;
  FeatureConfiguration: string;
}

/**
 * msdyn_GetSIFeatureConfiguration response message
 *
 * `result` is the value the msdyn_GetSIFeatureConfiguration action returns (see {@link msdyn_GetSIFeatureConfigurationResult}).
 */
export class msdyn_GetSIFeatureConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSIFeatureConfigurationResult) {
    super("msdyn_GetSIFeatureConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSIFeatureConfigurationResponse {
    return new msdyn_GetSIFeatureConfigurationResponse(
      data as msdyn_GetSIFeatureConfigurationResult
    );
  }
}
