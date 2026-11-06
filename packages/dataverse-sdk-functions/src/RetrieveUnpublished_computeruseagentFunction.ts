import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { computeruseagent } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_computeruseagentResponse extends computeruseagent {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.computeruseagent)
 *
 * The first argument is the id of the computeruseagent record to call it on.
 */
export class RetrieveUnpublished_computeruseagentFunction implements Executable<RetrieveUnpublished_computeruseagentResponse> {
  constructor(public readonly computeruseagentId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/computeruseagents(${this.computeruseagentId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_computeruseagentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveUnpublished_computeruseagentResponse;
    return (await response.json()) as RetrieveUnpublished_computeruseagentResponse;
  }
}
