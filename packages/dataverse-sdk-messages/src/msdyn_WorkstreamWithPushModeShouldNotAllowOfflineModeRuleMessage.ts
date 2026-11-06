import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse as msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponseData } from "./types/index.js";

/**
 * msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRule request message
 *
 * Web API Action: msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRule
 */
export class msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse>
{
  constructor() {
    super("msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRule`;

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
  ): Promise<msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse> {
    const data = await response.json();
    return msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse.fromResponse(data);
  }
}

/**
 * msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRule response message
 */
export class msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponseData
  ) {
    super("msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse {
    return new msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse(
      responseObject<msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponseData>(data)
    );
  }
}
