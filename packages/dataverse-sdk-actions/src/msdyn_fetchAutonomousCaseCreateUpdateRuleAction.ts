import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_fetchAutonomousCaseCreateUpdateRule action
 */
export interface msdyn_fetchAutonomousCaseCreateUpdateRuleResponse {
  autonomousCaseCreateUpdateRule: string;
}

/**
 * msdyn_fetchAutonomousCaseCreateUpdateRule action
 *
 * Unbound action
 */
export class msdyn_fetchAutonomousCaseCreateUpdateRuleAction implements Executable<msdyn_fetchAutonomousCaseCreateUpdateRuleResponse> {
  constructor(public readonly fetchRuleRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchAutonomousCaseCreateUpdateRule`;

    const body: Record<string, unknown> = {
      fetchRuleRequest: this.fetchRuleRequest,
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
  ): Promise<msdyn_fetchAutonomousCaseCreateUpdateRuleResponse> {
    const data = await response.json();
    return data as msdyn_fetchAutonomousCaseCreateUpdateRuleResponse;
  }
}
