import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetSIFeatureConfiguration request message
 *
 * Web API Action: msdyn_GetSIFeatureConfiguration
 */
export class msdyn_GetSIFeatureConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSIFeatureConfigurationResponse>
{
  constructor(
    public sIParameters: string,
    public orgMigratedToCoreServices: boolean
  ) {
    super("msdyn_GetSIFeatureConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSIFeatureConfiguration`;

    const body: Record<string, unknown> = {
      SIParameters: this.sIParameters,
      OrgMigratedToCoreServices: this.orgMigratedToCoreServices,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSIFeatureConfigurationResponse> {
    const data = await response.json();
    return msdyn_GetSIFeatureConfigurationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SIParameters: this.sIParameters,
      OrgMigratedToCoreServices: this.orgMigratedToCoreServices,
    };
  }
}

/**
 * msdyn_GetSIFeatureConfiguration response message
 */
export class msdyn_GetSIFeatureConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSIFeatureConfigurationResponse) {
    super("msdyn_GetSIFeatureConfiguration");
  }

  static fromResponse(data: unknown): msdyn_GetSIFeatureConfigurationResponse {
    return new msdyn_GetSIFeatureConfigurationResponse((data as any).value);
  }
}
