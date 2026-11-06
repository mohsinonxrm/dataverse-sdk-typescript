import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { ChannelAccessProfilePrivilege } from "./types/index.js";

/**
 * Parameters of the AddChannelAccessProfilePrivileges message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddChannelAccessProfilePrivilegesRequestParameters {
  ChannelAccessProfileId: string;
  Privileges?: ChannelAccessProfilePrivilege[];
}

/**
 * AddChannelAccessProfilePrivileges request message
 *
 * Web API Action: AddChannelAccessProfilePrivileges
 */
export class AddChannelAccessProfilePrivilegesRequest
  extends OrganizationRequest
  implements Executable<AddChannelAccessProfilePrivilegesResponse>
{
  declare readonly Parameters: Readonly<AddChannelAccessProfilePrivilegesRequestParameters>;

  constructor(parameters: AddChannelAccessProfilePrivilegesRequestParameters) {
    super("AddChannelAccessProfilePrivileges", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddChannelAccessProfilePrivileges`;

    const body = requestBody({
      ChannelAccessProfileId: this.Parameters.ChannelAccessProfileId,
      Privileges: enumBody(this.Parameters.Privileges, "ChannelAccessProfilePrivilege"),
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
