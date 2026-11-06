import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from mspp_ppComponentSecurityRoleBinder action
 */
export interface mspp_ppComponentSecurityRoleBinderResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<mspp_ppComponentSecurityRoleBinderResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as mspp_ppComponentSecurityRoleBinderResponse;
    return (await response.json()) as mspp_ppComponentSecurityRoleBinderResponse;
  }
}
