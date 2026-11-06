import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_WorkstreamShouldHaveNotificationTemplatesRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse;
  }
}
