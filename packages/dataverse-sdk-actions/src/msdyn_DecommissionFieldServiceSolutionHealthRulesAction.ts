import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DecommissionFieldServiceSolutionHealthRules action
 */
export interface msdyn_DecommissionFieldServiceSolutionHealthRulesResponse {
  Message: string;
  ReturnStatus: number;
  RuleId: string;
}

/**
 * msdyn_DecommissionFieldServiceSolutionHealthRules action
 *
 * Unbound action
 */
export class msdyn_DecommissionFieldServiceSolutionHealthRulesAction implements Executable<msdyn_DecommissionFieldServiceSolutionHealthRulesResponse> {
  constructor(public readonly solutionNames: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DecommissionFieldServiceSolutionHealthRules`;

    const body: Record<string, unknown> = {
      SolutionNames: this.solutionNames,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_DecommissionFieldServiceSolutionHealthRulesResponse> {
    const data = await response.json();
    return data as msdyn_DecommissionFieldServiceSolutionHealthRulesResponse;
  }
}
