import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { listmember } from "./types/index.js";

/**
 * Response from RemoveMemberList action
 */
export interface RemoveMemberListResponse {
  // No content returned
}

/**
 * Parameters of the RemoveMemberList action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveMemberListActionParameters {
  ListMember: EntityReference | EntityPayload<listmember>;
}

/**
 * RemoveMemberList action
 *
 * Bound action
 * Binding parameter: entity (mscrm.list)
 *
 * The first argument is the id of the list record to call it on.
 */
export class RemoveMemberListAction implements Executable<RemoveMemberListResponse> {
  constructor(
    public readonly listId: string,
    public readonly parameters: RemoveMemberListActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.RemoveMemberList`;

    const body = requestBody({
      ListMember: this.parameters.ListMember,
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

  async parseResponse(response: Response): Promise<RemoveMemberListResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RemoveMemberListResponse;
  }
}
