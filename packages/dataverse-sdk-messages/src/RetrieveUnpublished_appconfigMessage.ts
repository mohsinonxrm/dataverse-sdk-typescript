import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { appconfig } from "./types/index.js";

/**
 * RetrieveUnpublished request message
 *
 * Web API Function: RetrieveUnpublished
 *
 * The first argument is the id of the appconfig record to call it on.
 */
export class RetrieveUnpublished_appconfigRequest
  extends OrganizationRequest
  implements Executable<RetrieveUnpublished_appconfigResponse>
{
  constructor(public appconfigId: string) {
    super("RetrieveUnpublished");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/appconfigs(${odataLiteral.guid(this.appconfigId)})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_appconfigResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return RetrieveUnpublished_appconfigResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return RetrieveUnpublished_appconfigResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUnpublished function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RetrieveUnpublished_appconfigResult =
  | (appconfig & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * RetrieveUnpublished response message
 *
 * `result` is the value the RetrieveUnpublished function returns (see {@link RetrieveUnpublished_appconfigResult}).
 */
export class RetrieveUnpublished_appconfigResponse extends OrganizationResponse {
  constructor(public result: RetrieveUnpublished_appconfigResult) {
    super("RetrieveUnpublished");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUnpublished_appconfigResponse {
    return new RetrieveUnpublished_appconfigResponse(
      (data ?? null) as RetrieveUnpublished_appconfigResult
    );
  }
}
