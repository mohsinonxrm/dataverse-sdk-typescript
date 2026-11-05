import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FieldServiceSolutionHealthRulesRegistration action
 */
export interface msdyn_FieldServiceSolutionHealthRulesRegistrationResponse {
  Message: string;
  ReturnStatus: number;
  RuleId: string;
}

/**
 * msdyn_FieldServiceSolutionHealthRulesRegistration action
 *
 * Unbound action
 */
export class msdyn_FieldServiceSolutionHealthRulesRegistrationAction implements Executable<msdyn_FieldServiceSolutionHealthRulesRegistrationResponse> {
  constructor(public readonly solutionNames: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FieldServiceSolutionHealthRulesRegistration`;

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
  ): Promise<msdyn_FieldServiceSolutionHealthRulesRegistrationResponse> {
    const data = await response.json();
    return data as msdyn_FieldServiceSolutionHealthRulesRegistrationResponse;
  }
}
