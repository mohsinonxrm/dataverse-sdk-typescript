import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { incidentresolution } from "./types/index.js";

/**
 * Response from the CloseIncident action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CloseIncidentResponse = void;

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

  parseResponse(_response: Response): Promise<CloseIncidentResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
