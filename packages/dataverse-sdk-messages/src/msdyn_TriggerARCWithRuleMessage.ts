import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TriggerARCWithRule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TriggerARCWithRuleRequestParameters {
  msdyn_ruleid: string;
  msdyn_queueitemid: string;
}

/**
 * msdyn_TriggerARCWithRule request message
 *
 * Web API Action: msdyn_TriggerARCWithRule
 *
 * The first argument is the id of the queueitem record to call it on.
 */
export class msdyn_TriggerARCWithRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerARCWithRuleResponse>
{
  declare readonly Parameters: Readonly<msdyn_TriggerARCWithRuleRequestParameters>;

  constructor(
    public queueitemId: string,
    parameters: msdyn_TriggerARCWithRuleRequestParameters
  ) {
    super("msdyn_TriggerARCWithRule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queueitems(${odataLiteral.guid(this.queueitemId)})/Microsoft.Dynamics.CRM.msdyn_TriggerARCWithRule`;

    const body = requestBody({
      msdyn_ruleid: this.Parameters.msdyn_ruleid,
      msdyn_queueitemid: this.Parameters.msdyn_queueitemid,
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

  parseResponse(_response: Response): Promise<msdyn_TriggerARCWithRuleResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_TriggerARCWithRuleResponse());
  }
}

/**
 * msdyn_TriggerARCWithRule response message
 */
export class msdyn_TriggerARCWithRuleResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_TriggerARCWithRule");
  }

  static fromResponse(_data?: unknown): msdyn_TriggerARCWithRuleResponse {
    return new msdyn_TriggerARCWithRuleResponse();
  }
}
