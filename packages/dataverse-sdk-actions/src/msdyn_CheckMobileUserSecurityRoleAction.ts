import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckMobileUserSecurityRole action
 */
export interface msdyn_CheckMobileUserSecurityRoleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  HelpLink: string;
}

/**
 * Parameters of the msdyn_CheckMobileUserSecurityRole action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckMobileUserSecurityRoleActionParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckMobileUserSecurityRole action
 *
 * Unbound action
 */
export class msdyn_CheckMobileUserSecurityRoleAction implements Executable<msdyn_CheckMobileUserSecurityRoleResponse> {
  constructor(public readonly parameters: msdyn_CheckMobileUserSecurityRoleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckMobileUserSecurityRole`;

    const body = requestBody({
      SolutionId: this.parameters.SolutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckMobileUserSecurityRoleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckMobileUserSecurityRoleResponse;
    return (await response.json()) as msdyn_CheckMobileUserSecurityRoleResponse;
  }
}
