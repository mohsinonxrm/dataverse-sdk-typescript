import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CreateRoleWithPrivilegeCheckerRunResponse as CreateRoleWithPrivilegeCheckerRunResponseData } from "./types/index.js";

/**
 * Parameters of the CreateRoleWithPrivilegeCheckerRun message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateRoleWithPrivilegeCheckerRunRequestParameters {
  PrivilegeCheckerRunId: string;
  RoleName: string;
}

/**
 * CreateRoleWithPrivilegeCheckerRun request message
 *
 * Web API Action: CreateRoleWithPrivilegeCheckerRun
 *
 * The first argument is the id of the privilegecheckerrun record to call it on.
 */
export class CreateRoleWithPrivilegeCheckerRunRequest
  extends OrganizationRequest
  implements Executable<CreateRoleWithPrivilegeCheckerRunResponse>
{
  declare readonly Parameters: Readonly<CreateRoleWithPrivilegeCheckerRunRequestParameters>;

  constructor(
    public privilegecheckerrunId: string,
    parameters: CreateRoleWithPrivilegeCheckerRunRequestParameters
  ) {
    super("CreateRoleWithPrivilegeCheckerRun", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/privilegecheckerruns(${this.privilegecheckerrunId})/Microsoft.Dynamics.CRM.CreateRoleWithPrivilegeCheckerRun`;

    const body = requestBody({
      PrivilegeCheckerRunId: this.Parameters.PrivilegeCheckerRunId,
      RoleName: this.Parameters.RoleName,
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

  async parseResponse(response: Response): Promise<CreateRoleWithPrivilegeCheckerRunResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CreateRoleWithPrivilegeCheckerRunResponse.fromResponse(text ? JSON.parse(text) : {});
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
