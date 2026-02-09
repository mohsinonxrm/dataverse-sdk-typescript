import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OcServiceEndpointShouldBeConfiguredRule request message
 *
 * Web API Action: msdyn_OcServiceEndpointShouldBeConfiguredRule
 */
export class msdyn_OcServiceEndpointShouldBeConfiguredRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse>
{
  constructor() {
    super("msdyn_OcServiceEndpointShouldBeConfiguredRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcServiceEndpointShouldBeConfiguredRule`;

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
  ): Promise<msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse> {
    const data = await response.json();
    return msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_OcServiceEndpointShouldBeConfiguredRule response message
 */
export class msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse) {
    super("msdyn_OcServiceEndpointShouldBeConfiguredRule");
  }

  static fromResponse(data: unknown): msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse {
    return new msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse((data as any).value);
  }
}
