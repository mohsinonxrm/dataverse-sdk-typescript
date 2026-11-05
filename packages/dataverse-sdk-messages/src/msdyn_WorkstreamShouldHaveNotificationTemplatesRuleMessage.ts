import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const data = await response.json();
    return msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_WorkstreamShouldHaveNotificationTemplatesRule response message
 */
export class msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse) {
    super("msdyn_WorkstreamShouldHaveNotificationTemplatesRule");
  }

  static fromResponse(data: unknown): msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse {
    return new msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse((data as any).value);
  }
}
