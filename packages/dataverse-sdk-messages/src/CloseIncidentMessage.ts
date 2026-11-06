import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { incidentresolution } from "./types/index.js";

/**
 * Parameters of the CloseIncident message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CloseIncidentRequestParameters {
  IncidentResolution: EntityReference | EntityPayload<incidentresolution>;
  Status: number;
}

/**
 * CloseIncident request message
 *
 * Web API Action: CloseIncident
 */
export class CloseIncidentRequest
  extends OrganizationRequest
  implements Executable<CloseIncidentResponse>
{
  declare readonly Parameters: Readonly<CloseIncidentRequestParameters>;

  constructor(parameters: CloseIncidentRequestParameters) {
    super("CloseIncident", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloseIncident`;

    const body = requestBody({
      IncidentResolution: this.Parameters.IncidentResolution,
      Status: this.Parameters.Status,
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
    // No return value (204 No Content)
    return new CloseIncidentResponse();
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
