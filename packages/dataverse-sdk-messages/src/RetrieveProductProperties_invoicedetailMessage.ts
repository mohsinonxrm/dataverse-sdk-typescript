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
 * The first argument is the id of the invoicedetail record to call it on.
 */
export class RetrieveProductProperties_invoicedetailRequest
  extends OrganizationRequest
  implements Executable<RetrieveProductProperties_invoicedetailResponse>
{
  constructor(public invoicedetailId: string) {
    super("RetrieveProductProperties");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/invoicedetails(${odataLiteral.guid(this.invoicedetailId)})/Microsoft.Dynamics.CRM.RetrieveProductProperties`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<RetrieveProductProperties_invoicedetailResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveProductProperties_invoicedetailResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveProductProperties_invoicedetailResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveProductProperties function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveProductProperties_invoicedetailResult = Array<
  dynamicproperty & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveProductProperties response message
 *
 * `result` is the value the RetrieveProductProperties function returns (see {@link RetrieveProductProperties_invoicedetailResult}).
 */
export class RetrieveProductProperties_invoicedetailResponse extends OrganizationResponse {
  constructor(public result: RetrieveProductProperties_invoicedetailResult) {
    super("RetrieveProductProperties");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveProductProperties_invoicedetailResponse {
    return new RetrieveProductProperties_invoicedetailResponse(
      data === undefined
        ? []
        : (data as { value: RetrieveProductProperties_invoicedetailResult }).value
    );
  }
}
