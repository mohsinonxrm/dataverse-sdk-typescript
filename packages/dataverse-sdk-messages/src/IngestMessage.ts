import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { IngestResponse as IngestResponseData } from "./types/index.js";

/**
 * Parameters of the Ingest message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface IngestRequestParameters {
  version: string;
}

/**
 * Ingest request message
 *
 * Web API Action: Ingest
 *
 * The first argument is the id of the msdyn_pmrecording record to call it on.
 */
export class IngestRequest extends OrganizationRequest implements Executable<IngestResponse> {
  declare readonly Parameters: Readonly<IngestRequestParameters>;

  constructor(
    public msdyn_pmrecordingId: string,
    parameters: IngestRequestParameters
  ) {
    super("Ingest", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_pmrecordings(${this.msdyn_pmrecordingId})/Microsoft.Dynamics.CRM.Ingest`;

    const body = requestBody({
      version: this.Parameters.version,
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
    return IngestResponse.fromResponse(text ? JSON.parse(text) : {});
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
