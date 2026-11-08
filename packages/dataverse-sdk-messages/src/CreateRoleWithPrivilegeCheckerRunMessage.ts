import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    const url = `${baseUrl}/privilegecheckerruns(${odataLiteral.guid(this.privilegecheckerrunId)})/Microsoft.Dynamics.CRM.CreateRoleWithPrivilegeCheckerRun`;

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
    // The body is the complex value, with its @odata.context
    return CreateRoleWithPrivilegeCheckerRunResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateRoleWithPrivilegeCheckerRun action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateRoleWithPrivilegeCheckerRunResult {
  "@odata.context"?: string;
  RoleId: string;
}

/**
 * CreateRoleWithPrivilegeCheckerRun response message
 *
 * `result` is the value the CreateRoleWithPrivilegeCheckerRun action returns (see {@link CreateRoleWithPrivilegeCheckerRunResult}).
 */
export class CreateRoleWithPrivilegeCheckerRunResponse extends OrganizationResponse {
  constructor(public result: CreateRoleWithPrivilegeCheckerRunResult) {
    super("CreateRoleWithPrivilegeCheckerRun");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateRoleWithPrivilegeCheckerRunResponse {
    return new CreateRoleWithPrivilegeCheckerRunResponse(
      data as CreateRoleWithPrivilegeCheckerRunResult
    );
  }
}
