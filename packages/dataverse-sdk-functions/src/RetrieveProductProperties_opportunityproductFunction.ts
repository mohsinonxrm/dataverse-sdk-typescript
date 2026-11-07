import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { dynamicproperty } from "./types/index.js";

/**
 * Response from the RetrieveProductProperties function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveProductProperties_opportunityproductResponse = Array<
  dynamicproperty & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveProductProperties function
 *
 * Bound function
 * Binding parameter: entity (mscrm.opportunityproduct)
 *
 * The first argument is the id of the opportunityproduct record to call it on.
 */
export class RetrieveProductProperties_opportunityproductFunction implements Executable<RetrieveProductProperties_opportunityproductResponse> {
  constructor(public readonly opportunityproductId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/opportunityproducts(${this.opportunityproductId})/Microsoft.Dynamics.CRM.RetrieveProductProperties`;

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
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return (
      (await response.json()) as { value: RetrieveProductProperties_opportunityproductResponse }
    ).value;
  }
}
