import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CSAdminCenterAppSolutionHealthRulesRegistration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse {
  "@odata.context"?: string;
  Message: string;
  ReturnStatus: number;
  RuleId: string;
}

/**
 * Parameters of the msdyn_CSAdminCenterAppSolutionHealthRulesRegistration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationActionParameters {
  SolutionNames?: string;
}

/**
 * msdyn_CSAdminCenterAppSolutionHealthRulesRegistration action
 *
 * Unbound action
 */
export class msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationAction implements Executable<msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse> {
  constructor(
    public readonly parameters: msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSAdminCenterAppSolutionHealthRulesRegistration`;

    const body = requestBody({
      SolutionNames: this.parameters.SolutionNames,
    });

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse;
  }
}
