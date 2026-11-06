import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_InitiateAgentGroupAssignment action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_InitiateAgentGroupAssignmentResponse = void;

/**
 * Parameters of the CCaaS_InitiateAgentGroupAssignment action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentGroupAssignmentActionParameters {
  ApiVersion: string;
  AgentGroupId: string;
}

/**
 * CCaaS_InitiateAgentGroupAssignment action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateAgentGroupAssignmentAction implements Executable<CCaaS_InitiateAgentGroupAssignmentResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_InitiateAgentGroupAssignmentActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentGroupAssignment`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      AgentGroupId: this.parameters.AgentGroupId,
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

  parseResponse(_response: Response): Promise<CCaaS_InitiateAgentGroupAssignmentResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
