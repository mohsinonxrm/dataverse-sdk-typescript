import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CreateRoleWithPrivilegeCheckerRunResponse as CreateRoleWithPrivilegeCheckerRunResponseData } from "./types/index.js";

/**
 * CreateRoleWithPrivilegeCheckerRun request message
 *
 * Web API Action: CreateRoleWithPrivilegeCheckerRun
 */
export class CreateRoleWithPrivilegeCheckerRunRequest
  extends OrganizationRequest
  implements Executable<CreateRoleWithPrivilegeCheckerRunResponse>
{
  constructor(
    public privilegecheckerrunId: string,
    public privilegeCheckerRunId: string,
    public roleName: string
  ) {
    super("CreateRoleWithPrivilegeCheckerRun");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/privilegecheckerruns(${this.privilegecheckerrunId})/Microsoft.Dynamics.CRM.CreateRoleWithPrivilegeCheckerRun`;

    const body: Record<string, unknown> = {
      PrivilegeCheckerRunId: this.privilegeCheckerRunId,
      RoleName: this.roleName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CreateRoleWithPrivilegeCheckerRunResponse> {
    const data = await response.json();
    return CreateRoleWithPrivilegeCheckerRunResponse.fromResponse(data);
  }
}

/**
 * CreateRoleWithPrivilegeCheckerRun response message
 */
export class CreateRoleWithPrivilegeCheckerRunResponse extends OrganizationResponse {
  constructor(public result: CreateRoleWithPrivilegeCheckerRunResponseData) {
    super("CreateRoleWithPrivilegeCheckerRun");
  }

  static fromResponse(data: unknown): CreateRoleWithPrivilegeCheckerRunResponse {
    return new CreateRoleWithPrivilegeCheckerRunResponse(
      responseObject<CreateRoleWithPrivilegeCheckerRunResponseData>(data)
    );
  }
}
