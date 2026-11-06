import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_fetchAutonomousCaseCreateUpdateRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_fetchAutonomousCaseCreateUpdateRuleResponse {
  "@odata.context"?: string;
  autonomousCaseCreateUpdateRule: string;
}

/**
 * Parameters of the msdyn_fetchAutonomousCaseCreateUpdateRule action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_fetchAutonomousCaseCreateUpdateRuleActionParameters {
  fetchRuleRequest: string;
}

/**
 * msdyn_fetchAutonomousCaseCreateUpdateRule action
 *
 * Unbound action
 */
export class msdyn_fetchAutonomousCaseCreateUpdateRuleAction implements Executable<msdyn_fetchAutonomousCaseCreateUpdateRuleResponse> {
  constructor(
    public readonly parameters: msdyn_fetchAutonomousCaseCreateUpdateRuleActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchAutonomousCaseCreateUpdateRule`;

    const body = requestBody({
      fetchRuleRequest: this.parameters.fetchRuleRequest,
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
  ): Promise<msdyn_fetchAutonomousCaseCreateUpdateRuleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_fetchAutonomousCaseCreateUpdateRuleResponse;
  }
}
