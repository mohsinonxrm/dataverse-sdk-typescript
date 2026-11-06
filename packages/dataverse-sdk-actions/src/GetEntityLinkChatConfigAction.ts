import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from GetEntityLinkChatConfig action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface GetEntityLinkChatConfigResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as GetEntityLinkChatConfigResponse;
  }
}
