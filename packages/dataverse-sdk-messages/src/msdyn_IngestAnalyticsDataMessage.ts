import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_IngestAnalyticsData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IngestAnalyticsDataRequestParameters {
  IngestionRequest: string;
}

/**
 * msdyn_IngestAnalyticsData request message
 *
 * Web API Action: msdyn_IngestAnalyticsData
 */
export class msdyn_IngestAnalyticsDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_IngestAnalyticsDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_IngestAnalyticsDataRequestParameters>;

  constructor(parameters: msdyn_IngestAnalyticsDataRequestParameters) {
    super("msdyn_IngestAnalyticsData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IngestAnalyticsData`;

    const body = requestBody({
      IngestionRequest: this.Parameters.IngestionRequest,
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

  parseResponse(_response: Response): Promise<msdyn_IngestAnalyticsDataResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_IngestAnalyticsDataResponse());
  }
}

/**
 * msdyn_IngestAnalyticsData response message
 */
export class msdyn_IngestAnalyticsDataResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_IngestAnalyticsData");
  }

  static fromResponse(_data?: unknown): msdyn_IngestAnalyticsDataResponse {
    return new msdyn_IngestAnalyticsDataResponse();
  }
}
