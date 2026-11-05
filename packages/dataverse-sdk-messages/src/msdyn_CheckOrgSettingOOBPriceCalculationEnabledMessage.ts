import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse as msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponseData } from "./types/index.js";

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
    const data = await response.json();
    return msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckOrgSettingOOBPriceCalculationEnabled response message
 */
export class msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponseData) {
    super("msdyn_CheckOrgSettingOOBPriceCalculationEnabled");
  }

  static fromResponse(data: unknown): msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse {
    return new msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse(
      responseObject<msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponseData>(data)
    );
  }
}
