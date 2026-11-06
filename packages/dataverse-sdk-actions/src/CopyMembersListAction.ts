import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { list } from "./types/index.js";

/**
 * Response from CopyMembersList action
 */
export interface CopyMembersListResponse {
  // No content returned
}

/**
 * Parameters of the CopyMembersList action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CopyMembersListActionParameters {
  TargetList: EntityReference | EntityPayload<list>;
}

/**
 * CopyMembersList action
 *
 * Bound action
 * Binding parameter: entity (mscrm.list)
 *
 * The first argument is the id of the list record to call it on.
 */
export class CopyMembersListAction implements Executable<CopyMembersListResponse> {
  constructor(
    public readonly listId: string,
    public readonly parameters: CopyMembersListActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.CopyMembersList`;

    const body = requestBody({
      TargetList: this.parameters.TargetList,
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

  async parseResponse(response: Response): Promise<CopyMembersListResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CopyMembersListResponse;
    return (await response.json()) as CopyMembersListResponse;
  }
}
