import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CustomerServiceSolutionHealthRulesRegistration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse {
  "@odata.context"?: string;
  Message: string;
  ReturnStatus: string;
  RuleId: string;
}

/**
 * Parameters of the msdyn_CustomerServiceSolutionHealthRulesRegistration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CustomerServiceSolutionHealthRulesRegistrationActionParameters {
  SolutionNames?: string;
}

/**
 * msdyn_CustomerServiceSolutionHealthRulesRegistration action
 *
 * Unbound action
 */
export class msdyn_CustomerServiceSolutionHealthRulesRegistrationAction implements Executable<msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse> {
  constructor(
    public readonly parameters: msdyn_CustomerServiceSolutionHealthRulesRegistrationActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CustomerServiceSolutionHealthRulesRegistration`;

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
  ): Promise<msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse;
  }
}
