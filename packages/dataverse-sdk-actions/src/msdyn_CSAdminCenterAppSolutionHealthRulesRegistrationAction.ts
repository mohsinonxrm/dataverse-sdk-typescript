import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CSAdminCenterAppSolutionHealthRulesRegistration action
 */
export interface msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse {
  Message: string;
  ReturnStatus: number;
  RuleId: string;
}

/**
 * msdyn_CSAdminCenterAppSolutionHealthRulesRegistration action
 *
 * Unbound action
 */
export class msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationAction implements Executable<msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse> {
  constructor(public readonly solutionNames?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSAdminCenterAppSolutionHealthRulesRegistration`;

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
  ): Promise<msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse> {
    const data = await response.json();
    return data as msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse;
  }
}
