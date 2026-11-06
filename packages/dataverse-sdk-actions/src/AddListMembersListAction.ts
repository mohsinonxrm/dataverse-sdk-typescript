import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { list } from "./types/index.js";

/**
 * Response from the AddListMembersList action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type AddListMembersListResponse = void;

/**
 * Parameters of the AddListMembersList action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddListMembersListActionParameters {
  List: EntityReference | EntityPayload<list>;
  Members: Record<string, unknown>[];
}

/**
 * AddListMembersList action
 *
 * Unbound action
 */
export class AddListMembersListAction implements Executable<AddListMembersListResponse> {
  constructor(public readonly parameters: AddListMembersListActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddListMembersList`;

    const body = requestBody({
      List: this.parameters.List,
      Members: this.parameters.Members,
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

  parseResponse(_response: Response): Promise<AddListMembersListResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
