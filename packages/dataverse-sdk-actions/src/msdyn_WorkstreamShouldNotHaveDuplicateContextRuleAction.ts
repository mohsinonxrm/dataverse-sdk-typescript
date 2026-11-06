import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_WorkstreamShouldNotHaveDuplicateContextRule action
 */
export interface msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse;
    return (await response.json()) as msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse;
  }
}
