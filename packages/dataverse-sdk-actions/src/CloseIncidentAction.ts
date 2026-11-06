import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { incidentresolution } from "./types/index.js";

/**
 * Response from CloseIncident action
 */
export interface CloseIncidentResponse {
  // No content returned
}

/**
 * CloseIncident action
 *
 * Unbound action
 */
export class CloseIncidentAction implements Executable<CloseIncidentResponse> {
  constructor(
    public readonly incidentResolution: EntityReference | EntityPayload<incidentresolution>,
    public readonly status: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloseIncident`;

    const body: Record<string, unknown> = {
      IncidentResolution: this.incidentResolution,
      Status: this.status,
    };

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
    // No return value (204 No Content)
    return {};
  }
}
