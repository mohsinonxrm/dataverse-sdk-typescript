import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse as msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse.fromResponse({});
    return msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckOrgSettingIsSOPIntegrationEnabled response message
 */
export class msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponseData) {
    super("msdyn_CheckOrgSettingIsSOPIntegrationEnabled");
  }

  static fromResponse(data: unknown): msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse {
    return new msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse(
      responseObject<msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponseData>(data)
    );
  }
}
