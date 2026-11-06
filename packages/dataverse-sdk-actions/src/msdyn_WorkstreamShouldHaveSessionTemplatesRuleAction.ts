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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse;
  }
}
