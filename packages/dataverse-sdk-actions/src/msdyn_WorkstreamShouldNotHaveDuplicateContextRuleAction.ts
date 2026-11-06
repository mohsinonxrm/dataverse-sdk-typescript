import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_WorkstreamShouldNotHaveDuplicateContextRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WorkstreamShouldNotHaveDuplicateContextRule action
 *
 * Unbound action
 */
export class msdyn_WorkstreamShouldNotHaveDuplicateContextRuleAction implements Executable<msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WorkstreamShouldNotHaveDuplicateContextRule`;

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
  ): Promise<msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse;
  }
}
