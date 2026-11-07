import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { ChannelAccessProfilePrivilege } from "./types/index.js";

/**
 * Response from the AddChannelAccessProfilePrivileges action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type AddChannelAccessProfilePrivilegesResponse = void;

/**
 * Parameters of the AddChannelAccessProfilePrivileges action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddChannelAccessProfilePrivilegesActionParameters {
  ChannelAccessProfileId: string;
  Privileges?: ChannelAccessProfilePrivilege[];
}

/**
 * AddChannelAccessProfilePrivileges action
 *
 * Unbound action
 */
export class AddChannelAccessProfilePrivilegesAction implements Executable<AddChannelAccessProfilePrivilegesResponse> {
  constructor(public readonly parameters: AddChannelAccessProfilePrivilegesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddChannelAccessProfilePrivileges`;

    const body = requestBody({
      ChannelAccessProfileId: this.parameters.ChannelAccessProfileId,
      Privileges: enumBody(this.parameters.Privileges, "ChannelAccessProfilePrivilege"),
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

  parseResponse(_response: Response): Promise<AddChannelAccessProfilePrivilegesResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
