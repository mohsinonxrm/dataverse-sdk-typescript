import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the GetEntityLinkChatConfig action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GetEntityLinkChatConfigResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * Parameters of the GetEntityLinkChatConfig action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetEntityLinkChatConfigActionParameters {
  RegardingEntityName: string;
}

/**
 * GetEntityLinkChatConfig action
 *
 * Unbound action
 */
export class GetEntityLinkChatConfigAction implements Executable<GetEntityLinkChatConfigResponse> {
  constructor(public readonly parameters: GetEntityLinkChatConfigActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetEntityLinkChatConfig`;

    const body = requestBody({
      RegardingEntityName: this.parameters.RegardingEntityName,
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

  async parseResponse(response: Response): Promise<GetEntityLinkChatConfigResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as GetEntityLinkChatConfigResponse;
  }
}
