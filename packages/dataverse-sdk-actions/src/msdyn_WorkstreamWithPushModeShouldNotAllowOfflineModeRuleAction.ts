import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRule action
 */
export interface msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
}

/**
 * msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRule action
 *
 * Unbound action
 */
export class msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleAction implements Executable<msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse> {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse;
  }
}
