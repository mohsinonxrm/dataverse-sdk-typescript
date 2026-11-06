import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_OcSdkShouldBeActiveRuleResponse as msdyn_OcSdkShouldBeActiveRuleResponseData } from "./types/index.js";

/**
 * msdyn_OcSdkShouldBeActiveRule request message
 *
 * Web API Action: msdyn_OcSdkShouldBeActiveRule
 */
export class msdyn_OcSdkShouldBeActiveRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_OcSdkShouldBeActiveRuleResponse>
{
  constructor() {
    super("msdyn_OcSdkShouldBeActiveRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcSdkShouldBeActiveRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OcSdkShouldBeActiveRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_OcSdkShouldBeActiveRuleResponse.fromResponse({});
    return msdyn_OcSdkShouldBeActiveRuleResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_OcSdkShouldBeActiveRule response message
 */
export class msdyn_OcSdkShouldBeActiveRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcSdkShouldBeActiveRuleResponseData) {
    super("msdyn_OcSdkShouldBeActiveRule");
  }

  static fromResponse(data: unknown): msdyn_OcSdkShouldBeActiveRuleResponse {
    return new msdyn_OcSdkShouldBeActiveRuleResponse(
      responseObject<msdyn_OcSdkShouldBeActiveRuleResponseData>(data)
    );
  }
}
