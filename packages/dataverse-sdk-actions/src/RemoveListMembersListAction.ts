import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { list } from "./types/index.js";

/**
 * Response from RemoveListMembersList action
 */
export interface RemoveListMembersListResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<RemoveListMembersListResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RemoveListMembersListResponse;
    return (await response.json()) as RemoveListMembersListResponse;
  }
}
