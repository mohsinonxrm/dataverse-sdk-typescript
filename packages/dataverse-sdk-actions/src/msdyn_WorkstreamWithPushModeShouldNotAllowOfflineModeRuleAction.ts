import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRule action
 */
export interface msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse;
    return (await response.json()) as msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse;
  }
}
