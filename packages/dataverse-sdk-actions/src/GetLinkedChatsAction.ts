import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the GetLinkedChats action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetLinkedChatsResponse {
  "@odata.context"?: string;
  LinkedChatDetails: string;
}

/**
 * Parameters of the GetLinkedChats action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetLinkedChatsActionParameters {
  RegardingEntity: EntityReference | AnyEntityPayload;
}

/**
 * GetLinkedChats action
 *
 * Unbound action
 */
export class GetLinkedChatsAction implements Executable<GetLinkedChatsResponse> {
  constructor(public readonly parameters: GetLinkedChatsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetLinkedChats`;

    const body = requestBody({
      RegardingEntity: this.parameters.RegardingEntity,
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

  async parseResponse(response: Response): Promise<GetLinkedChatsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetLinkedChatsResponse;
  }
}
