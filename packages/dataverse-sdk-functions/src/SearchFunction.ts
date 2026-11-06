import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AppointmentRequest, SearchResults } from "./types/index.js";

/**
 * Response from Search function
 */
export interface SearchResponse {
  SearchResults: SearchResults;
}

/**
 * Search function
 *
 * Unbound function
 */
export class SearchFunction implements Executable<SearchResponse> {
  constructor(public readonly appointmentRequest?: AppointmentRequest) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/Search`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.appointmentRequest !== undefined) {
      aliases.push(`AppointmentRequest=@p1`);
      params.append("@p1", JSON.stringify(this.appointmentRequest));
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

  async parseResponse(response: Response): Promise<SearchResponse> {
    const data = await response.json();
    return data as SearchResponse;
  }
}
