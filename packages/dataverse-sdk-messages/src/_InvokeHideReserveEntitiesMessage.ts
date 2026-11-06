import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { _InvokeHideReserveEntitiesResponse as _InvokeHideReserveEntitiesResponseData } from "./types/index.js";

/**
 * _InvokeHideReserveEntities request message
 *
 * Web API Action: _InvokeHideReserveEntities
 */
export class _InvokeHideReserveEntitiesRequest
  extends OrganizationRequest
  implements Executable<_InvokeHideReserveEntitiesResponse>
{
  constructor() {
    super("_InvokeHideReserveEntities");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_InvokeHideReserveEntities`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<_InvokeHideReserveEntitiesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return _InvokeHideReserveEntitiesResponse.fromResponse({});
    return _InvokeHideReserveEntitiesResponse.fromResponse(await response.json());
  }
}

/**
 * _InvokeHideReserveEntities response message
 */
export class _InvokeHideReserveEntitiesResponse extends OrganizationResponse {
  constructor(public result: _InvokeHideReserveEntitiesResponseData) {
    super("_InvokeHideReserveEntities");
  }

  static fromResponse(data: unknown): _InvokeHideReserveEntitiesResponse {
    return new _InvokeHideReserveEntitiesResponse(
      responseObject<_InvokeHideReserveEntitiesResponseData>(data)
    );
  }
}
