import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return IngestResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the Ingest action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface IngestResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * Ingest response message
 *
 * `result` is the value the Ingest action returns (see {@link IngestResult}).
 */
export class IngestResponse extends OrganizationResponse {
  constructor(public result: IngestResult) {
    super("Ingest");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): IngestResponse {
    return new IngestResponse(data as IngestResult);
  }
}
