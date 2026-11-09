import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { systemform } from "./types/index.js";

/**
 * RetrieveUnpublished request message
 *
 * Web API Function: RetrieveUnpublished
 *
 * The first argument is the id of the systemform record to call it on.
 */
export class RetrieveUnpublished_systemformRequest
  extends OrganizationRequest
  implements Executable<RetrieveUnpublished_systemformResponse>
{
  constructor(public systemformId: string) {
    super("RetrieveUnpublished");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemforms(${odataLiteral.guid(this.systemformId)})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_systemformResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return RetrieveUnpublished_systemformResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return RetrieveUnpublished_systemformResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUnpublished function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RetrieveUnpublished_systemformResult =
  | (systemform & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * RetrieveUnpublished response message
 *
 * `result` is the value the RetrieveUnpublished function returns (see {@link RetrieveUnpublished_systemformResult}).
 */
export class RetrieveUnpublished_systemformResponse extends OrganizationResponse {
  constructor(public result: RetrieveUnpublished_systemformResult) {
    super("RetrieveUnpublished");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUnpublished_systemformResponse {
    return new RetrieveUnpublished_systemformResponse(
      (data ?? null) as RetrieveUnpublished_systemformResult
    );
  }
}
