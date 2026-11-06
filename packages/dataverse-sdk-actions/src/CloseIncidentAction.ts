import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { incidentresolution } from "./types/index.js";

/**
 * Response from CloseIncident action
 */
export interface CloseIncidentResponse {
  // No content returned
}

/**
 * Parameters of the CloseIncident action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CloseIncidentActionParameters {
  IncidentResolution: EntityReference | EntityPayload<incidentresolution>;
  Status: number;
}

/**
 * CloseIncident action
 *
 * Unbound action
 */
export class CloseIncidentAction implements Executable<CloseIncidentResponse> {
  constructor(public readonly parameters: CloseIncidentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloseIncident`;

    const body = requestBody({
      IncidentResolution: this.parameters.IncidentResolution,
      Status: this.parameters.Status,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CloseIncidentResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CloseIncidentResponse;
  }
}
