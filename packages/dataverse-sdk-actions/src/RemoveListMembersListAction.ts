import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { list } from "./types/index.js";

/**
 * Response from the RemoveListMembersList action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RemoveListMembersListResponse = void;

/**
 * Parameters of the RemoveListMembersList action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveListMembersListActionParameters {
  List: EntityReference | EntityPayload<list>;
  Members: Record<string, unknown>[];
}

/**
 * RemoveListMembersList action
 *
 * Unbound action
 */
export class RemoveListMembersListAction implements Executable<RemoveListMembersListResponse> {
  constructor(public readonly parameters: RemoveListMembersListActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveListMembersList`;

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

  parseResponse(_response: Response): Promise<RemoveListMembersListResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
