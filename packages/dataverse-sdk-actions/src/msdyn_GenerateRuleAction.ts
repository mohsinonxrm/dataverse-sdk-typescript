import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GenerateRule action
 */
export interface msdyn_GenerateRuleResponse {
  FailureReason: string;
  Status: string;
}

/**
 * Parameters of the msdyn_GenerateRule action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GenerateRuleActionParameters {
  OperationType: string;
  RuleId: string;
}

/**
 * msdyn_GenerateRule action
 *
 * Unbound action
 */
export class msdyn_GenerateRuleAction implements Executable<msdyn_GenerateRuleResponse> {
  constructor(public readonly parameters: msdyn_GenerateRuleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GenerateRule`;

    const body = requestBody({
      OperationType: this.parameters.OperationType,
      RuleId: this.parameters.RuleId,
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

  async parseResponse(response: Response): Promise<msdyn_GenerateRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GenerateRuleResponse;
    return (await response.json()) as msdyn_GenerateRuleResponse;
  }
}
