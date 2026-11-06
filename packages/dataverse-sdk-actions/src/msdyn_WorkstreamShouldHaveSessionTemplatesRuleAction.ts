import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_WorkstreamShouldHaveSessionTemplatesRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WorkstreamShouldHaveSessionTemplatesRule action
 *
 * Unbound action
 */
export class msdyn_WorkstreamShouldHaveSessionTemplatesRuleAction implements Executable<msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WorkstreamShouldHaveSessionTemplatesRule`;

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
  ): Promise<msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse;
  }
}
