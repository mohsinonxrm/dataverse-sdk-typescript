import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckMobileUserSecurityRole request message
 *
 * Web API Action: msdyn_CheckMobileUserSecurityRole
 */
export class msdyn_CheckMobileUserSecurityRoleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckMobileUserSecurityRoleResponse>
{
  constructor(public solutionId: string) {
    super("msdyn_CheckMobileUserSecurityRole");
  }

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
    return msdyn_CheckMobileUserSecurityRoleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionId: this.solutionId,
    };
  }
}

/**
 * msdyn_CheckMobileUserSecurityRole response message
 */
export class msdyn_CheckMobileUserSecurityRoleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckMobileUserSecurityRoleResponse) {
    super("msdyn_CheckMobileUserSecurityRole");
  }

  static fromResponse(data: unknown): msdyn_CheckMobileUserSecurityRoleResponse {
    return new msdyn_CheckMobileUserSecurityRoleResponse((data as any).value);
  }
}
