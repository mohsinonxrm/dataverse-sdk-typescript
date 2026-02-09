import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_WorkstreamShouldHaveSessionTemplatesRule action
 */
export interface msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse> {
    const data = await response.json();
    return data as msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse;
  }
}
