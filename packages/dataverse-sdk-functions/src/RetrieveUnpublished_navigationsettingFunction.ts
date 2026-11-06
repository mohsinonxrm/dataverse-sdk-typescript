import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { navigationsetting } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_navigationsettingResponse extends navigationsetting {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.navigationsetting)
 *
 * The first argument is the id of the navigationsetting record to call it on.
 */
export class RetrieveUnpublished_navigationsettingFunction implements Executable<RetrieveUnpublished_navigationsettingResponse> {
  constructor(public readonly navigationsettingId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/navigationsettings(${this.navigationsettingId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_navigationsettingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveUnpublished_navigationsettingResponse;
    return (await response.json()) as RetrieveUnpublished_navigationsettingResponse;
  }
}
