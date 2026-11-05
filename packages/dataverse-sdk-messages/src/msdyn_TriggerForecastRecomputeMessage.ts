import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TriggerForecastRecompute request message
 *
 * Web API Action: msdyn_TriggerForecastRecompute
 */
export class msdyn_TriggerForecastRecomputeRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerForecastRecomputeResponse>
{
  constructor(public inputData: string) {
    super("msdyn_TriggerForecastRecompute");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerForecastRecompute`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_TriggerForecastRecomputeResponse> {
    // No return value (204 No Content)
    return new msdyn_TriggerForecastRecomputeResponse();
  }
}

/**
 * msdyn_TriggerForecastRecompute response message
 */
export class msdyn_TriggerForecastRecomputeResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_TriggerForecastRecompute");
  }

  static fromResponse(_data: unknown): msdyn_TriggerForecastRecomputeResponse {
    return new msdyn_TriggerForecastRecomputeResponse();
  }
}
