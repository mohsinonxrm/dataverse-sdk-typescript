import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckOrgSettingOOBPriceCalculationEnabled request message
 *
 * Web API Action: msdyn_CheckOrgSettingOOBPriceCalculationEnabled
 */
export class msdyn_CheckOrgSettingOOBPriceCalculationEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse>
{
  constructor() {
    super("msdyn_CheckOrgSettingOOBPriceCalculationEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckOrgSettingOOBPriceCalculationEnabled`;

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
  ): Promise<msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CheckOrgSettingOOBPriceCalculationEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckOrgSettingOOBPriceCalculationEnabledResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckOrgSettingOOBPriceCalculationEnabled response message
 *
 * `result` is the value the msdyn_CheckOrgSettingOOBPriceCalculationEnabled action returns (see {@link msdyn_CheckOrgSettingOOBPriceCalculationEnabledResult}).
 */
export class msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckOrgSettingOOBPriceCalculationEnabledResult) {
    super("msdyn_CheckOrgSettingOOBPriceCalculationEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse {
    return new msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse(
      data as msdyn_CheckOrgSettingOOBPriceCalculationEnabledResult
    );
  }
}
