import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { list } from "./types/index.js";

/**
 * CopyDynamicListToStatic request message
 *
 * Web API Action: CopyDynamicListToStatic
 *
 * The first argument is the id of the list record to call it on.
 */
export class CopyDynamicListToStaticRequest
  extends OrganizationRequest
  implements Executable<CopyDynamicListToStaticResponse>
{
  constructor(public listId: string) {
    super("CopyDynamicListToStatic");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.CopyDynamicListToStatic`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CopyDynamicListToStaticResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CopyDynamicListToStaticResponse.fromResponse({});
    return CopyDynamicListToStaticResponse.fromResponse(await response.json());
  }
}

/**
 * CopyDynamicListToStatic response message
 */
export class CopyDynamicListToStaticResponse extends OrganizationResponse {
  constructor(public result: list) {
    super("CopyDynamicListToStatic");
  }

  static fromResponse(data: unknown): CopyDynamicListToStaticResponse {
    return new CopyDynamicListToStaticResponse(responseObject<list>(data));
  }
}
