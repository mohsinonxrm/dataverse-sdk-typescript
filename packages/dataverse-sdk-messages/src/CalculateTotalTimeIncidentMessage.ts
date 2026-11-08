import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CalculateTotalTimeIncident request message
 *
 * Web API Function: CalculateTotalTimeIncident
 *
 * The first argument is the id of the incident record to call it on.
 */
export class CalculateTotalTimeIncidentRequest
  extends OrganizationRequest
  implements Executable<CalculateTotalTimeIncidentResponse>
{
  constructor(public incidentId: string) {
    super("CalculateTotalTimeIncident");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/incidents(${odataLiteral.guid(this.incidentId)})/Microsoft.Dynamics.CRM.CalculateTotalTimeIncident`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CalculateTotalTimeIncidentResponse> {
    // The body is the complex value, with its @odata.context
    return CalculateTotalTimeIncidentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CalculateTotalTimeIncident function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CalculateTotalTimeIncidentResult {
  "@odata.context"?: string;
  TotalTime: number;
}

/**
 * CalculateTotalTimeIncident response message
 *
 * `result` is the value the CalculateTotalTimeIncident function returns (see {@link CalculateTotalTimeIncidentResult}).
 */
export class CalculateTotalTimeIncidentResponse extends OrganizationResponse {
  constructor(public result: CalculateTotalTimeIncidentResult) {
    super("CalculateTotalTimeIncident");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CalculateTotalTimeIncidentResponse {
    return new CalculateTotalTimeIncidentResponse(data as CalculateTotalTimeIncidentResult);
  }
}
