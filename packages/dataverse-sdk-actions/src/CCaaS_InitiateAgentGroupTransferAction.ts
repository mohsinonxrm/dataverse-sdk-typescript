import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_InitiateAgentGroupTransfer action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_InitiateAgentGroupTransferResponse = void;

/**
 * Parameters of the CCaaS_InitiateAgentGroupTransfer action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentGroupTransferActionParameters {
  IntentId?: string;
  ApiVersion: string;
  IntentGroupId?: string;
  AgentGroupId: string;
  IntentFamilyId?: string;
}

/**
 * CCaaS_InitiateAgentGroupTransfer action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateAgentGroupTransferAction implements Executable<CCaaS_InitiateAgentGroupTransferResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_InitiateAgentGroupTransferActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentGroupTransfer`;

    const body = requestBody({
      IntentId: this.parameters.IntentId,
      ApiVersion: this.parameters.ApiVersion,
      IntentGroupId: this.parameters.IntentGroupId,
      AgentGroupId: this.parameters.AgentGroupId,
      IntentFamilyId: this.parameters.IntentFamilyId,
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

  parseResponse(_response: Response): Promise<CCaaS_InitiateAgentGroupTransferResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
