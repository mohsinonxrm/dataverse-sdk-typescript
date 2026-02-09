import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from GetEntityLinkChatConfig action
 */
export interface GetEntityLinkChatConfigResponse {
  value: EntityReference;
}

/**
 * GetEntityLinkChatConfig action
 *
 * Unbound action
 */
export class GetEntityLinkChatConfigAction implements Executable<GetEntityLinkChatConfigResponse> {
  constructor(public readonly regardingEntityName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetEntityLinkChatConfig`;

    const body: Record<string, unknown> = {
      RegardingEntityName: this.regardingEntityName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GetEntityLinkChatConfigResponse> {
    const data = await response.json();
    return data as GetEntityLinkChatConfigResponse;
  }
}
