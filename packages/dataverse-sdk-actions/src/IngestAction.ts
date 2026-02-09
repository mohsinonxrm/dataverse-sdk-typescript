import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from Ingest action
 */
export interface IngestResponse {
  response: string;
}

/**
 * Ingest action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_pmrecording)
 */
export class IngestAction implements Executable<IngestResponse> {
  constructor(
    public readonly msdyn_pmrecordingId: string,
    public readonly version: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_pmrecordings(${this.msdyn_pmrecordingId})/Microsoft.Dynamics.CRM.Ingest`;

    const body: Record<string, unknown> = {
      version: this.version,
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

  async parseResponse(response: Response): Promise<IngestResponse> {
    const data = await response.json();
    return data as IngestResponse;
  }
}
