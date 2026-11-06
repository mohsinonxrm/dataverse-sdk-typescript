import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the Ingest action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface IngestResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as IngestResponse;
  }
}
