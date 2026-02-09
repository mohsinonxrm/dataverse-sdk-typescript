import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CustomerServiceSolutionHealthRulesRegistration action
 */
export interface msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse {
  Message: string;
  ReturnStatus: string;
  RuleId: string;
}

/**
 * msdyn_CustomerServiceSolutionHealthRulesRegistration action
 *
 * Unbound action
 */
export class msdyn_CustomerServiceSolutionHealthRulesRegistrationAction implements Executable<msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse> {
  constructor(public readonly solutionNames: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CustomerServiceSolutionHealthRulesRegistration`;

    const body: Record<string, unknown> = {
      SolutionNames: this.solutionNames,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse> {
    const data = await response.json();
    return data as msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse;
  }
}
