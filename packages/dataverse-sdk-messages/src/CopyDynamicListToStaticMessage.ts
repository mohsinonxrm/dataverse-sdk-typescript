import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return CopyDynamicListToStaticResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return CopyDynamicListToStaticResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CopyDynamicListToStatic action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CopyDynamicListToStaticResult =
  (list & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * CopyDynamicListToStatic response message
 *
 * `result` is the value the CopyDynamicListToStatic action returns (see {@link CopyDynamicListToStaticResult}).
 */
export class CopyDynamicListToStaticResponse extends OrganizationResponse {
  constructor(public result: CopyDynamicListToStaticResult) {
    super("CopyDynamicListToStatic");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CopyDynamicListToStaticResponse {
    return new CopyDynamicListToStaticResponse((data ?? null) as CopyDynamicListToStaticResult);
  }
}
