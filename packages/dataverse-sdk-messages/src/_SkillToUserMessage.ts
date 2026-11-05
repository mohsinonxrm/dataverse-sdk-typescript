import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * _SkillToUser request message
 *
 * Web API Action: _SkillToUser
 */
export class _SkillToUserRequest
  extends OrganizationRequest
  implements Executable<_SkillToUserResponse>
{
  constructor(
    public updatedBRC: Record<string, unknown>[],
    public deletedBRC: Record<string, unknown>[]
  ) {
    super("_SkillToUser");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_SkillToUser`;

    const body: Record<string, unknown> = {
      UpdatedBRC: this.updatedBRC,
      DeletedBRC: this.deletedBRC,
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

  async parseResponse(response: Response): Promise<_SkillToUserResponse> {
    // No return value (204 No Content)
    return new _SkillToUserResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      UpdatedBRC: this.updatedBRC,
      DeletedBRC: this.deletedBRC,
    };
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
