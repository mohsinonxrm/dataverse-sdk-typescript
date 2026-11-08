import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveExchangeAppointments message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveExchangeAppointmentsRequestParameters {
  StartDate: string | Date;
  EndDate: string | Date;
}

/**
 * RetrieveExchangeAppointments request message
 *
 * Web API Function: RetrieveExchangeAppointments
 */
export class RetrieveExchangeAppointmentsRequest
  extends OrganizationRequest
  implements Executable<RetrieveExchangeAppointmentsResponse>
{
  declare readonly Parameters: Readonly<RetrieveExchangeAppointmentsRequestParameters>;

  constructor(parameters: RetrieveExchangeAppointmentsRequestParameters) {
    super("RetrieveExchangeAppointments", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveExchangeAppointments`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.StartDate !== undefined) {
      aliases.push(`StartDate=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.StartDate, "Edm.DateTimeOffset"));
    }
    if (this.Parameters.EndDate !== undefined) {
      aliases.push(`EndDate=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.EndDate, "Edm.DateTimeOffset"));
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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveExchangeAppointmentsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveExchangeAppointmentsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveExchangeAppointments function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveExchangeAppointmentsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrieveExchangeAppointments response message
 *
 * `result` is the value the RetrieveExchangeAppointments function returns (see {@link RetrieveExchangeAppointmentsResult}).
 */
export class RetrieveExchangeAppointmentsResponse extends OrganizationResponse {
  constructor(public result: RetrieveExchangeAppointmentsResult) {
    super("RetrieveExchangeAppointments");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveExchangeAppointmentsResponse {
    return new RetrieveExchangeAppointmentsResponse(
      data === undefined ? [] : (data as { value: RetrieveExchangeAppointmentsResult }).value
    );
  }
}
