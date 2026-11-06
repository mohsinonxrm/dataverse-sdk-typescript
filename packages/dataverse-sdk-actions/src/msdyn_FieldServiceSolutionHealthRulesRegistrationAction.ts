import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FieldServiceSolutionHealthRulesRegistration action
 */
export interface msdyn_FieldServiceSolutionHealthRulesRegistrationResponse {
  Message: string;
  ReturnStatus: number;
  RuleId: string;
}

/**
 * Parameters of the msdyn_FieldServiceSolutionHealthRulesRegistration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceSolutionHealthRulesRegistrationActionParameters {
  SolutionNames: string;
}

/**
 * msdyn_FieldServiceSolutionHealthRulesRegistration action
 *
 * Unbound action
 */
export class msdyn_FieldServiceSolutionHealthRulesRegistrationAction implements Executable<msdyn_FieldServiceSolutionHealthRulesRegistrationResponse> {
  constructor(
    public readonly parameters: msdyn_FieldServiceSolutionHealthRulesRegistrationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FieldServiceSolutionHealthRulesRegistration`;

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
  ): Promise<msdyn_FieldServiceSolutionHealthRulesRegistrationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_FieldServiceSolutionHealthRulesRegistrationResponse;
    return (await response.json()) as msdyn_FieldServiceSolutionHealthRulesRegistrationResponse;
  }
}
