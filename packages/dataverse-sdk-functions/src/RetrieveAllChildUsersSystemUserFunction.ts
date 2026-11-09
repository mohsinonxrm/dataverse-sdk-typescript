import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { systemuser } from "./types/index.js";

/**
 * Response from the RetrieveAllChildUsersSystemUser function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveAllChildUsersSystemUserResponse = Array<
  systemuser & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveAllChildUsersSystemUser function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveAllChildUsersSystemUserFunction implements Executable<RetrieveAllChildUsersSystemUserResponse> {
  constructor(public readonly systemuserId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrieveAllChildUsersSystemUser`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveAllChildUsersSystemUserResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveAllChildUsersSystemUserResponse }).value;
  }
}
