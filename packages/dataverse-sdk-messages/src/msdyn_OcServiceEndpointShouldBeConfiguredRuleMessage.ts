import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse as msdyn_OcServiceEndpointShouldBeConfiguredRuleResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_OcServiceEndpointShouldBeConfiguredRule response message
 */
export class msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcServiceEndpointShouldBeConfiguredRuleResponseData) {
    super("msdyn_OcServiceEndpointShouldBeConfiguredRule");
  }

  static fromResponse(data: unknown): msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse {
    return new msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse(
      responseObject<msdyn_OcServiceEndpointShouldBeConfiguredRuleResponseData>(data)
    );
  }
}
