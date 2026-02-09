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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse> {
    const data = await response.json();
    return data as msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse;
  }
}
