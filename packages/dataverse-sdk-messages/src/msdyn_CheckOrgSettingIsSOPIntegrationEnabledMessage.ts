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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckOrgSettingIsSOPIntegrationEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckOrgSettingIsSOPIntegrationEnabledResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckOrgSettingIsSOPIntegrationEnabled response message
 *
 * `result` is the value the msdyn_CheckOrgSettingIsSOPIntegrationEnabled action returns (see {@link msdyn_CheckOrgSettingIsSOPIntegrationEnabledResult}).
 */
export class msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckOrgSettingIsSOPIntegrationEnabledResult) {
    super("msdyn_CheckOrgSettingIsSOPIntegrationEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse {
    return new msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse(
      data as msdyn_CheckOrgSettingIsSOPIntegrationEnabledResult
    );
  }
}
