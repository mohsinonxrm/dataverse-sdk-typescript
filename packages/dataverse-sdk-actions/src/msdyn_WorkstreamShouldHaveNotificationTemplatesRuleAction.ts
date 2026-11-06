import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_WorkstreamShouldHaveNotificationTemplatesRule action
 */
export interface msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
}

/**
 * msdyn_WorkstreamShouldHaveNotificationTemplatesRule action
 *
 * Unbound action
 */
export class msdyn_WorkstreamShouldHaveNotificationTemplatesRuleAction implements Executable<msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse> {
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse;
    return (await response.json()) as msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse;
  }
}
