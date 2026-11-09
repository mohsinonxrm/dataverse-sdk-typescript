import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return _InvokeHideReserveEntitiesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the _InvokeHideReserveEntities action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _InvokeHideReserveEntitiesResult {
  "@odata.context"?: string;
  output: string;
}

/**
 * _InvokeHideReserveEntities response message
 *
 * `result` is the value the _InvokeHideReserveEntities action returns (see {@link _InvokeHideReserveEntitiesResult}).
 */
export class _InvokeHideReserveEntitiesResponse extends OrganizationResponse {
  constructor(public result: _InvokeHideReserveEntitiesResult) {
    super("_InvokeHideReserveEntities");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): _InvokeHideReserveEntitiesResponse {
    return new _InvokeHideReserveEntitiesResponse(data as _InvokeHideReserveEntitiesResult);
  }
}
