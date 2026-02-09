import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TriggerARCWithRule request message
 *
 * Web API Action: msdyn_TriggerARCWithRule
 */
export class msdyn_TriggerARCWithRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerARCWithRuleResponse>
{
  constructor(
    public queueitemId: string,
    public msdyn_ruleid: string,
    public msdyn_queueitemid: string
  ) {
    super("msdyn_TriggerARCWithRule");
  }

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
    return new msdyn_TriggerARCWithRuleResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.queueitemId,
      msdyn_ruleid: this.msdyn_ruleid,
      msdyn_queueitemid: this.msdyn_queueitemid,
    };
  }
}

/**
 * msdyn_TriggerARCWithRule response message
 */
export class msdyn_TriggerARCWithRuleResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_TriggerARCWithRule");
  }

  static fromResponse(_data: unknown): msdyn_TriggerARCWithRuleResponse {
    return new msdyn_TriggerARCWithRuleResponse();
  }
}
