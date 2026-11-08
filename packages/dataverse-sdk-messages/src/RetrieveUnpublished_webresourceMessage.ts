import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { webresource } from "./types/index.js";

/**
 * RetrieveUnpublished request message
 *
 * Web API Function: RetrieveUnpublished
 *
 * The first argument is the id of the webresource record to call it on.
 */
export class RetrieveUnpublished_webresourceRequest
  extends OrganizationRequest
  implements Executable<RetrieveUnpublished_webresourceResponse>
{
  constructor(public webresourceId: string) {
    super("RetrieveUnpublished");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/webresourceset(${odataLiteral.guid(this.webresourceId)})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_webresourceResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return RetrieveUnpublished_webresourceResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return RetrieveUnpublished_webresourceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUnpublished function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RetrieveUnpublished_webresourceResult =
  | (webresource & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * RetrieveUnpublished response message
 *
 * `result` is the value the RetrieveUnpublished function returns (see {@link RetrieveUnpublished_webresourceResult}).
 */
export class RetrieveUnpublished_webresourceResponse extends OrganizationResponse {
  constructor(public result: RetrieveUnpublished_webresourceResult) {
    super("RetrieveUnpublished");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUnpublished_webresourceResponse {
    return new RetrieveUnpublished_webresourceResponse(
      (data ?? null) as RetrieveUnpublished_webresourceResult
    );
  }
}
