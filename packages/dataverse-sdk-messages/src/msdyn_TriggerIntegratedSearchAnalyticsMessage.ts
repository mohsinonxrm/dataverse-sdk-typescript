import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TriggerIntegratedSearchAnalytics request message
 *
 * Web API Action: msdyn_TriggerIntegratedSearchAnalytics
 */
export class msdyn_TriggerIntegratedSearchAnalyticsRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerIntegratedSearchAnalyticsResponse>
{
  constructor() {
    super("msdyn_TriggerIntegratedSearchAnalytics");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerIntegratedSearchAnalytics`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerIntegratedSearchAnalyticsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TriggerIntegratedSearchAnalyticsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TriggerIntegratedSearchAnalytics action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TriggerIntegratedSearchAnalyticsResult {
  "@odata.context"?: string;
  msdyn_IntegratedSearchAnalyticsResponse: string;
}

/**
 * msdyn_TriggerIntegratedSearchAnalytics response message
 *
 * `result` is the value the msdyn_TriggerIntegratedSearchAnalytics action returns (see {@link msdyn_TriggerIntegratedSearchAnalyticsResult}).
 */
export class msdyn_TriggerIntegratedSearchAnalyticsResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerIntegratedSearchAnalyticsResult) {
    super("msdyn_TriggerIntegratedSearchAnalytics");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TriggerIntegratedSearchAnalyticsResponse {
    return new msdyn_TriggerIntegratedSearchAnalyticsResponse(
      data as msdyn_TriggerIntegratedSearchAnalyticsResult
    );
  }
}
