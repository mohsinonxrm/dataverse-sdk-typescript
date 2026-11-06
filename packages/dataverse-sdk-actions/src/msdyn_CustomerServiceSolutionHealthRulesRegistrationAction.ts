import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CustomerServiceSolutionHealthRulesRegistration action
 */
export interface msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse;
  }
}
