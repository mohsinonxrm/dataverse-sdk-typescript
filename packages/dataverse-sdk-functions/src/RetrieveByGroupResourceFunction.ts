import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { resource } from "./types/index.js";

/**
 * Response from the RetrieveByGroupResource function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveByGroupResourceResponse = Array<
  resource & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveByGroupResource function
 *
 * Bound function
 * Binding parameter: entity (mscrm.resourcegroup)
 *
 * The first argument is the id of the resourcegroup record to call it on.
 */
export class RetrieveByGroupResourceFunction implements Executable<RetrieveByGroupResourceResponse> {
  constructor(public readonly resourcegroupId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/resourcegroups(${odataLiteral.guid(this.resourcegroupId)})/Microsoft.Dynamics.CRM.RetrieveByGroupResource`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveByGroupResourceResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveByGroupResourceResponse }).value;
  }
}
