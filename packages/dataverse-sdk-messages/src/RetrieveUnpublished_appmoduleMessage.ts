import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { appmodule } from "./types/index.js";

/**
 * RetrieveUnpublished request message
 *
 * Web API Function: RetrieveUnpublished
 *
 * The first argument is the id of the appmodule record to call it on.
 */
export class RetrieveUnpublished_appmoduleRequest
  extends OrganizationRequest
  implements Executable<RetrieveUnpublished_appmoduleResponse>
{
  constructor(public appmoduleId: string) {
    super("RetrieveUnpublished");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/appmodules(${odataLiteral.guid(this.appmoduleId)})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_appmoduleResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return RetrieveUnpublished_appmoduleResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return RetrieveUnpublished_appmoduleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUnpublished function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RetrieveUnpublished_appmoduleResult =
  | (appmodule & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * RetrieveUnpublished response message
 *
 * `result` is the value the RetrieveUnpublished function returns (see {@link RetrieveUnpublished_appmoduleResult}).
 */
export class RetrieveUnpublished_appmoduleResponse extends OrganizationResponse {
  constructor(public result: RetrieveUnpublished_appmoduleResult) {
    super("RetrieveUnpublished");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUnpublished_appmoduleResponse {
    return new RetrieveUnpublished_appmoduleResponse(
      (data ?? null) as RetrieveUnpublished_appmoduleResult
    );
  }
}
