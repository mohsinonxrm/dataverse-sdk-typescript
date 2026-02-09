import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
 * msdyn_CheckMobileUserSecurityRole action
 *
 * Unbound action
 */
export class msdyn_CheckMobileUserSecurityRoleAction implements Executable<msdyn_CheckMobileUserSecurityRoleResponse> {
  constructor(public readonly solutionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckMobileUserSecurityRole`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckMobileUserSecurityRoleResponse> {
    const data = await response.json();
    return data as msdyn_CheckMobileUserSecurityRoleResponse;
  }
}
