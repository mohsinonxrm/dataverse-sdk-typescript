import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { enumBody } from "./internal/enumBody.js";
import type { ChannelAccessProfilePrivilege } from "./types/index.js";

/**
 * AddChannelAccessProfilePrivileges request message
 *
 * Web API Action: AddChannelAccessProfilePrivileges
 */
export class AddChannelAccessProfilePrivilegesRequest
  extends OrganizationRequest
  implements Executable<AddChannelAccessProfilePrivilegesResponse>
{
  constructor(
    public channelAccessProfileId: string,
    public privileges?: ChannelAccessProfilePrivilege[]
  ) {
    super("AddChannelAccessProfilePrivileges");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddChannelAccessProfilePrivileges`;

    const body: Record<string, unknown> = {
      ChannelAccessProfileId: this.channelAccessProfileId,
      Privileges: enumBody(this.privileges, "ChannelAccessProfilePrivilege"),
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

  async parseResponse(response: Response): Promise<AddChannelAccessProfilePrivilegesResponse> {
    // No return value (204 No Content)
    return new AddChannelAccessProfilePrivilegesResponse();
  }
}

/**
 * AddChannelAccessProfilePrivileges response message
 */
export class AddChannelAccessProfilePrivilegesResponse extends OrganizationResponse {
  constructor() {
    super("AddChannelAccessProfilePrivileges");
  }

  static fromResponse(_data: unknown): AddChannelAccessProfilePrivilegesResponse {
    return new AddChannelAccessProfilePrivilegesResponse();
  }
}
