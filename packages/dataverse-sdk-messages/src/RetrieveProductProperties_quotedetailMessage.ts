import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { dynamicproperty } from "./types/index.js";

/**
 * RetrieveProductProperties request message
 *
 * Web API Function: RetrieveProductProperties
 *
 * The first argument is the id of the quotedetail record to call it on.
 */
export class RetrieveProductProperties_quotedetailRequest
  extends OrganizationRequest
  implements Executable<RetrieveProductProperties_quotedetailResponse>
{
  constructor(public quotedetailId: string) {
    super("RetrieveProductProperties");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/quotedetails(${odataLiteral.guid(this.quotedetailId)})/Microsoft.Dynamics.CRM.RetrieveProductProperties`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveProductProperties_quotedetailResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveProductProperties_quotedetailResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveProductProperties_quotedetailResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveProductProperties function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveProductProperties_quotedetailResult = Array<
  dynamicproperty & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveProductProperties response message
 *
 * `result` is the value the RetrieveProductProperties function returns (see {@link RetrieveProductProperties_quotedetailResult}).
 */
export class RetrieveProductProperties_quotedetailResponse extends OrganizationResponse {
  constructor(public result: RetrieveProductProperties_quotedetailResult) {
    super("RetrieveProductProperties");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveProductProperties_quotedetailResponse {
    return new RetrieveProductProperties_quotedetailResponse(
      data === undefined
        ? []
        : (data as { value: RetrieveProductProperties_quotedetailResult }).value
    );
  }
}
