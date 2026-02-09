import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveExchangeAppointments function
 */
export interface RetrieveExchangeAppointmentsResponse {
  value: EntityReference[];
}

/**
 * RetrieveExchangeAppointments function
 *
 * Unbound function
 */
export class RetrieveExchangeAppointmentsFunction implements Executable<RetrieveExchangeAppointmentsResponse> {
  constructor(
    public readonly startDate: string,
    public readonly endDate: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveExchangeAppointments`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.startDate !== undefined) {
      aliases.push(`StartDate=@p1`);
      params.append(
        "@p1",
        typeof this.startDate === "string" ? `'${this.startDate}'` : String(this.startDate)
      );
    }
    if (this.endDate !== undefined) {
      aliases.push(`EndDate=@p2`);
      params.append(
        "@p2",
        typeof this.endDate === "string" ? `'${this.endDate}'` : String(this.endDate)
      );
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

  async parseResponse(response: Response): Promise<RetrieveExchangeAppointmentsResponse> {
    const data = await response.json();
    return data as RetrieveExchangeAppointmentsResponse;
  }
}
