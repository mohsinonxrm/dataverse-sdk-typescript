import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the mspp_ppComponentSecurityRoleBinder action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type mspp_ppComponentSecurityRoleBinderResponse = void;

/**
 * Parameters of the mspp_ppComponentSecurityRoleBinder action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface mspp_ppComponentSecurityRoleBinderActionParameters {
  mspp_EntityLogicalName: string;
}

/**
 * mspp_ppComponentSecurityRoleBinder action
 *
 * Bound action
 * Binding parameter: entity (mscrm.powerpagecomponent)
 *
 * The first argument is the id of the powerpagecomponent record to call it on.
 */
export class mspp_ppComponentSecurityRoleBinderAction implements Executable<mspp_ppComponentSecurityRoleBinderResponse> {
  constructor(
    public readonly powerpagecomponentId: string,
    public readonly parameters: mspp_ppComponentSecurityRoleBinderActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/powerpagecomponents(${this.powerpagecomponentId})/Microsoft.Dynamics.CRM.mspp_ppComponentSecurityRoleBinder`;

    const body = requestBody({
      mspp_EntityLogicalName: this.parameters.mspp_EntityLogicalName,
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

  parseResponse(_response: Response): Promise<mspp_ppComponentSecurityRoleBinderResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
