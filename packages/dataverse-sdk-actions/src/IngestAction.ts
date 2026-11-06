import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from Ingest action
 */
export interface IngestResponse {
  response: string;
}

/**
 * Parameters of the Ingest action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface IngestActionParameters {
  version: string;
}

/**
 * Ingest action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_pmrecording)
 *
 * The first argument is the id of the msdyn_pmrecording record to call it on.
 */
export class IngestAction implements Executable<IngestResponse> {
  constructor(
    public readonly msdyn_pmrecordingId: string,
    public readonly parameters: IngestActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_pmrecordings(${this.msdyn_pmrecordingId})/Microsoft.Dynamics.CRM.Ingest`;

    const body = requestBody({
      version: this.parameters.version,
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

  async parseResponse(response: Response): Promise<IngestResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as IngestResponse;
  }
}
