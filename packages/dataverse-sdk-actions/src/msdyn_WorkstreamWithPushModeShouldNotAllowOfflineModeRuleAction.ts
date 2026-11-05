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
    const data = await response.json();
    return data as msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse;
  }
}
