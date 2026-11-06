import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the _SkillToUser message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _SkillToUserRequestParameters {
  UpdatedBRC?: Record<string, unknown>[];
  DeletedBRC?: Record<string, unknown>[];
}

/**
 * _SkillToUser request message
 *
 * Web API Action: _SkillToUser
 */
export class _SkillToUserRequest
  extends OrganizationRequest
  implements Executable<_SkillToUserResponse>
{
  declare readonly Parameters: Readonly<_SkillToUserRequestParameters>;

  constructor(parameters: _SkillToUserRequestParameters = {}) {
    super("_SkillToUser", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_SkillToUser`;

    const body = requestBody({
      UpdatedBRC: this.Parameters.UpdatedBRC,
      DeletedBRC: this.Parameters.DeletedBRC,
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

  async parseResponse(response: Response): Promise<_SkillToUserResponse> {
    // No return value (204 No Content)
    return new _SkillToUserResponse();
  }
}

/**
 * _SkillToUser response message
 */
export class _SkillToUserResponse extends OrganizationResponse {
  constructor() {
    super("_SkillToUser");
  }

  static fromResponse(_data: unknown): _SkillToUserResponse {
    return new _SkillToUserResponse();
  }
}
