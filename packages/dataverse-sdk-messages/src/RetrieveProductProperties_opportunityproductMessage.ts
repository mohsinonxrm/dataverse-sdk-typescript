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
 * The first argument is the id of the opportunityproduct record to call it on.
 */
export class RetrieveProductProperties_opportunityproductRequest
  extends OrganizationRequest
  implements Executable<RetrieveProductProperties_opportunityproductResponse>
{
  constructor(public opportunityproductId: string) {
    super("RetrieveProductProperties");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/opportunityproducts(${odataLiteral.guid(this.opportunityproductId)})/Microsoft.Dynamics.CRM.RetrieveProductProperties`;

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
  ): Promise<RetrieveProductProperties_opportunityproductResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveProductProperties_opportunityproductResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveProductProperties_opportunityproductResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveProductProperties function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveProductProperties_opportunityproductResult = Array<
  dynamicproperty & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveProductProperties response message
 *
 * `result` is the value the RetrieveProductProperties function returns (see {@link RetrieveProductProperties_opportunityproductResult}).
 */
export class RetrieveProductProperties_opportunityproductResponse extends OrganizationResponse {
  constructor(public result: RetrieveProductProperties_opportunityproductResult) {
    super("RetrieveProductProperties");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveProductProperties_opportunityproductResponse {
    return new RetrieveProductProperties_opportunityproductResponse(
      data === undefined
        ? []
        : (data as { value: RetrieveProductProperties_opportunityproductResult }).value
    );
  }
}
