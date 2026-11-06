import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateSequenceDailyUsageMetric message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateSequenceDailyUsageMetricRequestParameters {
  PreviousDaysCount?: number;
}

/**
 * msdyn_UpdateSequenceDailyUsageMetric request message
 *
 * Web API Action: msdyn_UpdateSequenceDailyUsageMetric
 */
export class msdyn_UpdateSequenceDailyUsageMetricRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateSequenceDailyUsageMetricResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateSequenceDailyUsageMetricRequestParameters>;

  constructor(parameters: msdyn_UpdateSequenceDailyUsageMetricRequestParameters = {}) {
    super("msdyn_UpdateSequenceDailyUsageMetric", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSequenceDailyUsageMetric`;

    const body = requestBody({
      PreviousDaysCount: this.Parameters.PreviousDaysCount,
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
