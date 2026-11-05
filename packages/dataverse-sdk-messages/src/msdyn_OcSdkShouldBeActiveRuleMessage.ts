import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const data = await response.json();
    return msdyn_OcSdkShouldBeActiveRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_OcSdkShouldBeActiveRule response message
 */
export class msdyn_OcSdkShouldBeActiveRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcSdkShouldBeActiveRuleResponse) {
    super("msdyn_OcSdkShouldBeActiveRule");
  }

  static fromResponse(data: unknown): msdyn_OcSdkShouldBeActiveRuleResponse {
    return new msdyn_OcSdkShouldBeActiveRuleResponse((data as any).value);
  }
}
