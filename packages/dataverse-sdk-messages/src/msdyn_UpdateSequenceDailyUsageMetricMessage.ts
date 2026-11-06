import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateSequenceDailyUsageMetric request message
 *
 * Web API Action: msdyn_UpdateSequenceDailyUsageMetric
 */
export class msdyn_UpdateSequenceDailyUsageMetricRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateSequenceDailyUsageMetricResponse>
{
  constructor(public previousDaysCount: number) {
    super("msdyn_UpdateSequenceDailyUsageMetric");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSequenceDailyUsageMetric`;

    const body: Record<string, unknown> = {
      PreviousDaysCount: this.previousDaysCount,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateSequenceDailyUsageMetricResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateSequenceDailyUsageMetricResponse();
  }
}

/**
 * msdyn_UpdateSequenceDailyUsageMetric response message
 */
export class msdyn_UpdateSequenceDailyUsageMetricResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateSequenceDailyUsageMetric");
  }

  static fromResponse(_data: unknown): msdyn_UpdateSequenceDailyUsageMetricResponse {
    return new msdyn_UpdateSequenceDailyUsageMetricResponse();
  }
}
