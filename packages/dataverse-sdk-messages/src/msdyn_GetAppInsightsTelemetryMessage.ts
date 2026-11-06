import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetAppInsightsTelemetryResponse as msdyn_GetAppInsightsTelemetryResponseData } from "./types/index.js";

/**
 * msdyn_GetAppInsightsTelemetry request message
 *
 * Web API Action: msdyn_GetAppInsightsTelemetry
 */
export class msdyn_GetAppInsightsTelemetryRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAppInsightsTelemetryResponse>
{
  constructor(
    public msdyn_Query: string,
    public msdyn_Timespan?: string,
    public msdyn_LiveWorkItemIds?: string
  ) {
    super("msdyn_GetAppInsightsTelemetry");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAppInsightsTelemetry`;

    const body: Record<string, unknown> = {
      msdyn_Query: this.msdyn_Query,
      msdyn_Timespan: this.msdyn_Timespan,
      msdyn_LiveWorkItemIds: this.msdyn_LiveWorkItemIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetAppInsightsTelemetryResponse> {
    const data = await response.json();
    return msdyn_GetAppInsightsTelemetryResponse.fromResponse(data);
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
