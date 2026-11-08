import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { computeruseagent } from "./types/index.js";

/**
 * RetrieveUnpublished request message
 *
 * Web API Function: RetrieveUnpublished
 *
 * The first argument is the id of the computeruseagent record to call it on.
 */
export class RetrieveUnpublished_computeruseagentRequest
  extends OrganizationRequest
  implements Executable<RetrieveUnpublished_computeruseagentResponse>
{
  constructor(public computeruseagentId: string) {
    super("RetrieveUnpublished");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/computeruseagents(${odataLiteral.guid(this.computeruseagentId)})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_computeruseagentResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return RetrieveUnpublished_computeruseagentResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return RetrieveUnpublished_computeruseagentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUnpublished function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RetrieveUnpublished_computeruseagentResult =
  | (computeruseagent & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * RetrieveUnpublished response message
 *
 * `result` is the value the RetrieveUnpublished function returns (see {@link RetrieveUnpublished_computeruseagentResult}).
 */
export class RetrieveUnpublished_computeruseagentResponse extends OrganizationResponse {
  constructor(public result: RetrieveUnpublished_computeruseagentResult) {
    super("RetrieveUnpublished");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUnpublished_computeruseagentResponse {
    return new RetrieveUnpublished_computeruseagentResponse(
      (data ?? null) as RetrieveUnpublished_computeruseagentResult
    );
  }
}
