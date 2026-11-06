import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from AddMemberList action
 */
export interface AddMemberListResponse {
  Id: string;
}

/**
 * Parameters of the AddMemberList action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddMemberListActionParameters {
  EntityId: string;
}

/**
 * AddMemberList action
 *
 * Bound action
 * Binding parameter: entity (mscrm.list)
 *
 * The first argument is the id of the list record to call it on.
 */
export class AddMemberListAction implements Executable<AddMemberListResponse> {
  constructor(
    public readonly listId: string,
    public readonly parameters: AddMemberListActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.AddMemberList`;

    const body = requestBody({
      EntityId: this.parameters.EntityId,
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

  async parseResponse(response: Response): Promise<AddMemberListResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AddMemberListResponse;
  }
}
