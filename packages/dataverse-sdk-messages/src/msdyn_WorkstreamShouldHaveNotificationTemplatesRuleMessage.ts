import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse as msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponseData } from "./types/index.js";

/**
 * msdyn_WorkstreamShouldHaveNotificationTemplatesRule request message
 *
 * Web API Action: msdyn_WorkstreamShouldHaveNotificationTemplatesRule
 */
export class msdyn_WorkstreamShouldHaveNotificationTemplatesRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse>
{
  constructor() {
    super("msdyn_WorkstreamShouldHaveNotificationTemplatesRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WorkstreamShouldHaveNotificationTemplatesRule`;

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
  ): Promise<msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_WorkstreamShouldHaveNotificationTemplatesRule response message
 */
export class msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponseData) {
    super("msdyn_WorkstreamShouldHaveNotificationTemplatesRule");
  }

  static fromResponse(data: unknown): msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse {
    return new msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse(
      responseObject<msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponseData>(data)
    );
  }
}
