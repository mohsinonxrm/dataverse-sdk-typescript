import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { workflow } from "./types/index.js";

/**
 * Response from the RetrieveUnpublishedMultiple function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveUnpublishedMultiple_workflow_collectionResponse = Array<
  workflow & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.workflow))
 */
export class RetrieveUnpublishedMultiple_workflow_collectionFunction implements Executable<RetrieveUnpublishedMultiple_workflow_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/workflows/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_workflow_collectionResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return (
      (await response.json()) as { value: RetrieveUnpublishedMultiple_workflow_collectionResponse }
    ).value;
  }
}
