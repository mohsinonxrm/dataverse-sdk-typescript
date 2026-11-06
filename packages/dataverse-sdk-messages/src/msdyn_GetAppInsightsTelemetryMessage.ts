import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetAppInsightsTelemetry message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAppInsightsTelemetryRequestParameters {
  msdyn_Timespan?: string;
  msdyn_LiveWorkItemIds?: string;
  msdyn_Query: string;
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
      msdyn_Timespan: this.Parameters.msdyn_Timespan,
      msdyn_LiveWorkItemIds: this.Parameters.msdyn_LiveWorkItemIds,
      msdyn_Query: this.Parameters.msdyn_Query,
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
    // The body is the complex value, with its @odata.context
    return msdyn_GetAppInsightsTelemetryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAppInsightsTelemetry action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAppInsightsTelemetryResult {
  "@odata.context"?: string;
  msdyn_Response: string;
}

/**
 * msdyn_GetAppInsightsTelemetry response message
 *
 * `result` is the value the msdyn_GetAppInsightsTelemetry action returns (see {@link msdyn_GetAppInsightsTelemetryResult}).
 */
export class msdyn_GetAppInsightsTelemetryResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAppInsightsTelemetryResult) {
    super("msdyn_GetAppInsightsTelemetry");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAppInsightsTelemetryResponse {
    return new msdyn_GetAppInsightsTelemetryResponse(data as msdyn_GetAppInsightsTelemetryResult);
  }
}
