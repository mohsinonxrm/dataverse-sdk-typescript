import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AddMemberList action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AddMemberListResponse {
  "@odata.context"?: string;
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
    const url = `${baseUrl}/lists(${odataLiteral.guid(this.listId)})/Microsoft.Dynamics.CRM.AddMemberList`;

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as AddMemberListResponse;
  }
}
