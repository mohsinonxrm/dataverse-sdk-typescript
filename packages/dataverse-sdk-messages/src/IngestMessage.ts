import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { IngestResponse as IngestResponseData } from "./types/index.js";

/**
 * Ingest request message
 *
 * Web API Action: Ingest
 */
export class IngestRequest extends OrganizationRequest implements Executable<IngestResponse> {
  constructor(
    public msdyn_pmrecordingId: string,
    public version: string
  ) {
    super("Ingest");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<IngestResponse> {
    const data = await response.json();
    return IngestResponse.fromResponse(data);
  }
}

/**
 * Ingest response message
 */
export class IngestResponse extends OrganizationResponse {
  constructor(public result: IngestResponseData) {
    super("Ingest");
  }

  static fromResponse(data: unknown): IngestResponse {
    return new IngestResponse(responseObject<IngestResponseData>(data));
  }
}
