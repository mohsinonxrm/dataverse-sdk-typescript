import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveExchangeAppointments function
 */
export interface RetrieveExchangeAppointmentsResponse {
  value: EntityReference[];
}

/**
 * Parameters of the RetrieveExchangeAppointments function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveExchangeAppointmentsFunctionParameters {
  StartDate: string | Date;
  EndDate: string | Date;
}

/**
 * RetrieveExchangeAppointments function
 *
 * Unbound function
 */
export class RetrieveExchangeAppointmentsFunction implements Executable<RetrieveExchangeAppointmentsResponse> {
  constructor(public readonly parameters: RetrieveExchangeAppointmentsFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveExchangeAppointments`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.StartDate !== undefined) {
      aliases.push(`StartDate=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.StartDate, "Edm.DateTimeOffset"));
    }
    if (this.parameters.EndDate !== undefined) {
      aliases.push(`EndDate=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.EndDate, "Edm.DateTimeOffset"));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveExchangeAppointmentsResponse;
    return (await response.json()) as RetrieveExchangeAppointmentsResponse;
  }
}
