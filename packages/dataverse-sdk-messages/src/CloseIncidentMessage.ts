import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { incidentresolution } from "./types/index.js";

/**
 * CloseIncident request message
 *
 * Web API Action: CloseIncident
 */
export class CloseIncidentRequest
  extends OrganizationRequest
  implements Executable<CloseIncidentResponse>
{
  constructor(
    public incidentResolution: incidentresolution,
    public status: number
  ) {
    super("CloseIncident");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CloseIncidentResponse> {
    // No return value (204 No Content)
    return new CloseIncidentResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      IncidentResolution: this.incidentResolution,
      Status: this.status,
    };
  }
}

/**
 * CloseIncident response message
 */
export class CloseIncidentResponse extends OrganizationResponse {
  constructor() {
    super("CloseIncident");
  }

  static fromResponse(_data: unknown): CloseIncidentResponse {
    return new CloseIncidentResponse();
  }
}
