import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { desktopflowbinary } from "./types/index.js";

/**
 * RetrieveUnpublished request message
 *
 * Web API Function: RetrieveUnpublished
 *
 * The first argument is the id of the desktopflowbinary record to call it on.
 */
export class RetrieveUnpublished_desktopflowbinaryRequest
  extends OrganizationRequest
  implements Executable<RetrieveUnpublished_desktopflowbinaryResponse>
{
  constructor(public desktopflowbinaryId: string) {
    super("RetrieveUnpublished");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/desktopflowbinaries(${odataLiteral.guid(this.desktopflowbinaryId)})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_desktopflowbinaryResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return RetrieveUnpublished_desktopflowbinaryResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return RetrieveUnpublished_desktopflowbinaryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUnpublished function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RetrieveUnpublished_desktopflowbinaryResult =
  | (desktopflowbinary & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * RetrieveUnpublished response message
 *
 * `result` is the value the RetrieveUnpublished function returns (see {@link RetrieveUnpublished_desktopflowbinaryResult}).
 */
export class RetrieveUnpublished_desktopflowbinaryResponse extends OrganizationResponse {
  constructor(public result: RetrieveUnpublished_desktopflowbinaryResult) {
    super("RetrieveUnpublished");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUnpublished_desktopflowbinaryResponse {
    return new RetrieveUnpublished_desktopflowbinaryResponse(
      (data ?? null) as RetrieveUnpublished_desktopflowbinaryResult
    );
  }
}
