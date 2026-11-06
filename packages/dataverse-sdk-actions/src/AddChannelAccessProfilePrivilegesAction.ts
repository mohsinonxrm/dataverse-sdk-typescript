import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { enumBody } from "./internal/enumBody.js";
import type { ChannelAccessProfilePrivilege } from "./types/index.js";

/**
 * Response from AddChannelAccessProfilePrivileges action
 */
export interface AddChannelAccessProfilePrivilegesResponse {
  // No content returned
}

/**
 * AddChannelAccessProfilePrivileges action
 *
 * Unbound action
 */
export class AddChannelAccessProfilePrivilegesAction implements Executable<AddChannelAccessProfilePrivilegesResponse> {
  constructor(
    public readonly channelAccessProfileId: string,
    public readonly privileges?: ChannelAccessProfilePrivilege[]
  ) {}

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
    return {};
  }
}
