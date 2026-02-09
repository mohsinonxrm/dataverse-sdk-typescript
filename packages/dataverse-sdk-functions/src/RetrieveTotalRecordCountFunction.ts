import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Response from RetrieveTotalRecordCount function
 */
export interface RetrieveTotalRecordCountResponse {
  EntityRecordCountCollection: EntityRecordCountCollection;
}

/**
 * RetrieveTotalRecordCount function
 *
 * Unbound function
 */
export class RetrieveTotalRecordCountFunction implements Executable<RetrieveTotalRecordCountResponse> {
  constructor(public readonly entityNames: string[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveTotalRecordCount`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.entityNames !== undefined) {
      aliases.push(`EntityNames=@p1`);
      params.append("@p1", JSON.stringify(this.entityNames));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveTotalRecordCountResponse> {
    const data = await response.json();
    return data as RetrieveTotalRecordCountResponse;
  }
}
