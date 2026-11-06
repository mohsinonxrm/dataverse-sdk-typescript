import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_DecommissionFieldServiceSolutionHealthRules action
 */
export interface msdyn_DecommissionFieldServiceSolutionHealthRulesResponse {
  Message: string;
  ReturnStatus: number;
  RuleId: string;
}

/**
 * Parameters of the msdyn_DecommissionFieldServiceSolutionHealthRules action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DecommissionFieldServiceSolutionHealthRulesActionParameters {
  SolutionNames: string;
}

/**
 * msdyn_DecommissionFieldServiceSolutionHealthRules action
 *
 * Unbound action
 */
export class msdyn_DecommissionFieldServiceSolutionHealthRulesAction implements Executable<msdyn_DecommissionFieldServiceSolutionHealthRulesResponse> {
  constructor(
    public readonly parameters: msdyn_DecommissionFieldServiceSolutionHealthRulesActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DecommissionFieldServiceSolutionHealthRules`;

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
  ): Promise<msdyn_DecommissionFieldServiceSolutionHealthRulesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_DecommissionFieldServiceSolutionHealthRulesResponse;
    return (await response.json()) as msdyn_DecommissionFieldServiceSolutionHealthRulesResponse;
  }
}
