import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSIFeatureConfigurationResponse as msdyn_GetSIFeatureConfigurationResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetSIFeatureConfigurationResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetSIFeatureConfiguration response message
 */
export class msdyn_GetSIFeatureConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSIFeatureConfigurationResponseData) {
    super("msdyn_GetSIFeatureConfiguration");
  }

  static fromResponse(data: unknown): msdyn_GetSIFeatureConfigurationResponse {
    return new msdyn_GetSIFeatureConfigurationResponse(
      responseObject<msdyn_GetSIFeatureConfigurationResponseData>(data)
    );
  }
}
