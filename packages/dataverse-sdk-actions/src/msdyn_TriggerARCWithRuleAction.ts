import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TriggerARCWithRule action
 */
export interface msdyn_TriggerARCWithRuleResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_TriggerARCWithRule action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TriggerARCWithRuleActionParameters {
  msdyn_ruleid: string;
  msdyn_queueitemid: string;
}

/**
 * msdyn_TriggerARCWithRule action
 *
 * Bound action
 * Binding parameter: entity (mscrm.queueitem)
 *
 * The first argument is the id of the queueitem record to call it on.
 */
export class msdyn_TriggerARCWithRuleAction implements Executable<msdyn_TriggerARCWithRuleResponse> {
  constructor(
    public readonly queueitemId: string,
    public readonly parameters: msdyn_TriggerARCWithRuleActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queueitems(${this.queueitemId})/Microsoft.Dynamics.CRM.msdyn_TriggerARCWithRule`;

    const body = requestBody({
      msdyn_ruleid: this.parameters.msdyn_ruleid,
      msdyn_queueitemid: this.parameters.msdyn_queueitemid,
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

  async parseResponse(response: Response): Promise<msdyn_TriggerARCWithRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_TriggerARCWithRuleResponse;
  }
}
