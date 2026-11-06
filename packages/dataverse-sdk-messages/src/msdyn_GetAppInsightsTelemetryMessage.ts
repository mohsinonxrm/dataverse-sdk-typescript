import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAppInsightsTelemetryResponse as msdyn_GetAppInsightsTelemetryResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetAppInsightsTelemetry message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAppInsightsTelemetryRequestParameters {
  msdyn_Query: string;
  msdyn_Timespan?: string;
  msdyn_LiveWorkItemIds?: string;
}

/**
 * msdyn_GetAppInsightsTelemetry request message
 *
 * Web API Action: msdyn_GetAppInsightsTelemetry
 */
export class msdyn_GetAppInsightsTelemetryRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAppInsightsTelemetryResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAppInsightsTelemetryRequestParameters>;

  constructor(parameters: msdyn_GetAppInsightsTelemetryRequestParameters) {
    super("msdyn_GetAppInsightsTelemetry", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAppInsightsTelemetry`;

    const body = requestBody({
      msdyn_Query: this.Parameters.msdyn_Query,
      msdyn_Timespan: this.Parameters.msdyn_Timespan,
      msdyn_LiveWorkItemIds: this.Parameters.msdyn_LiveWorkItemIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetAppInsightsTelemetryResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetAppInsightsTelemetryResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetAppInsightsTelemetry response message
 */
export class msdyn_GetAppInsightsTelemetryResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAppInsightsTelemetryResponseData) {
    super("msdyn_GetAppInsightsTelemetry");
  }

  static fromResponse(data: unknown): msdyn_GetAppInsightsTelemetryResponse {
    return new msdyn_GetAppInsightsTelemetryResponse(
      responseObject<msdyn_GetAppInsightsTelemetryResponseData>(data)
    );
  }
}
