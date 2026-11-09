import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the _RemoveMarketingListMembersByIds message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _RemoveMarketingListMembersByIdsRequestParameters {
  ListId?: string;
  MemberIds?: string;
}

/**
 * _RemoveMarketingListMembersByIds request message
 *
 * Web API Action: _RemoveMarketingListMembersByIds
 */
export class _RemoveMarketingListMembersByIdsRequest
  extends OrganizationRequest
  implements Executable<_RemoveMarketingListMembersByIdsResponse>
{
  declare readonly Parameters: Readonly<_RemoveMarketingListMembersByIdsRequestParameters>;

  constructor(parameters: _RemoveMarketingListMembersByIdsRequestParameters = {}) {
    super("_RemoveMarketingListMembersByIds", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_RemoveMarketingListMembersByIds`;

    const body = requestBody({
      ListId: this.Parameters.ListId,
      MemberIds: this.Parameters.MemberIds,
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
    // No return value (204 No Content)
    return Promise.resolve(new _RemoveMarketingListMembersByIdsResponse());
  }
}

/**
 * _RemoveMarketingListMembersByIds response message
 */
export class _RemoveMarketingListMembersByIdsResponse extends OrganizationResponse {
  constructor() {
    super("_RemoveMarketingListMembersByIds");
  }

  static fromResponse(_data?: unknown): _RemoveMarketingListMembersByIdsResponse {
    return new _RemoveMarketingListMembersByIdsResponse();
  }
}
