import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IngestAnalyticsData request message
 *
 * Web API Action: msdyn_IngestAnalyticsData
 */
export class msdyn_IngestAnalyticsDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_IngestAnalyticsDataResponse>
{
  constructor(public ingestionRequest: string) {
    super("msdyn_IngestAnalyticsData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IngestAnalyticsData`;

    const body: Record<string, unknown> = {
      IngestionRequest: this.ingestionRequest,
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

  async parseResponse(response: Response): Promise<msdyn_IngestAnalyticsDataResponse> {
    // No return value (204 No Content)
    return new msdyn_IngestAnalyticsDataResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      IngestionRequest: this.ingestionRequest,
    };
  }
}

/**
 * msdyn_IngestAnalyticsData response message
 */
export class msdyn_IngestAnalyticsDataResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_IngestAnalyticsData");
  }

  static fromResponse(_data: unknown): msdyn_IngestAnalyticsDataResponse {
    return new msdyn_IngestAnalyticsDataResponse();
  }
}
