import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckOrgSettingIsSOPIntegrationEnabled request message
 *
 * Web API Action: msdyn_CheckOrgSettingIsSOPIntegrationEnabled
 */
export class msdyn_CheckOrgSettingIsSOPIntegrationEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse>
{
  constructor() {
    super("msdyn_CheckOrgSettingIsSOPIntegrationEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckOrgSettingIsSOPIntegrationEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse> {
    const data = await response.json();
    return msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckOrgSettingIsSOPIntegrationEnabled response message
 */
export class msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse) {
    super("msdyn_CheckOrgSettingIsSOPIntegrationEnabled");
  }

  static fromResponse(data: unknown): msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse {
    return new msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse((data as any).value);
  }
}
