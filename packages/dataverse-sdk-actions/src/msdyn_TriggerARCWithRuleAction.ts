import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TriggerARCWithRule action
 */
export interface msdyn_TriggerARCWithRuleResponse {
  // No content returned
}

/**
 * msdyn_TriggerARCWithRule action
 *
 * Bound action
 * Binding parameter: entity (mscrm.queueitem)
 */
export class msdyn_TriggerARCWithRuleAction implements Executable<msdyn_TriggerARCWithRuleResponse> {
  constructor(
    public readonly queueitemId: string,
    public readonly msdyn_ruleid: string,
    public readonly msdyn_queueitemid: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queueitems(${this.queueitemId})/Microsoft.Dynamics.CRM.msdyn_TriggerARCWithRule`;

    const body: Record<string, unknown> = {
      msdyn_ruleid: this.msdyn_ruleid,
      msdyn_queueitemid: this.msdyn_queueitemid,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerARCWithRuleResponse> {
    // No return value (204 No Content)
    return {};
  }
}
