import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { list } from "./types/index.js";

/**
 * Response from AddListMembersList action
 */
export interface AddListMembersListResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<AddListMembersListResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as AddListMembersListResponse;
    return (await response.json()) as AddListMembersListResponse;
  }
}
