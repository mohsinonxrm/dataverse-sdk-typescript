import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRule response message
 *
 * `result` is the value the msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRule action returns (see {@link msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResult}).
 */
export class msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResult) {
    super("msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse {
    return new msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse(
      data as msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResult
    );
  }
}
