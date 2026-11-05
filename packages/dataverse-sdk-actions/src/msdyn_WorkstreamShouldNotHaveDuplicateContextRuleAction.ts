import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_WorkstreamShouldNotHaveDuplicateContextRule action
 */
export interface msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
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
    const data = await response.json();
    return data as msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse;
  }
}
