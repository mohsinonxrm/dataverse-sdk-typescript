import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the _RemoveMarketingListMembersByIds action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type _RemoveMarketingListMembersByIdsResponse = void;

/**
 * Parameters of the _RemoveMarketingListMembersByIds action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _RemoveMarketingListMembersByIdsActionParameters {
  ListId?: string;
  MemberIds?: string;
}

/**
 * _RemoveMarketingListMembersByIds action
 *
 * Unbound action
 */
export class _RemoveMarketingListMembersByIdsAction implements Executable<_RemoveMarketingListMembersByIdsResponse> {
  constructor(public readonly parameters: _RemoveMarketingListMembersByIdsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_RemoveMarketingListMembersByIds`;

    const body = requestBody({
      ListId: this.parameters.ListId,
      MemberIds: this.parameters.MemberIds,
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

  parseResponse(_response: Response): Promise<_RemoveMarketingListMembersByIdsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
