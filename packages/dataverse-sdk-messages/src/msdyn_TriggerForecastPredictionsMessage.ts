import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TriggerForecastPredictions request message
 *
 * Web API Action: msdyn_TriggerForecastPredictions
 */
export class msdyn_TriggerForecastPredictionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerForecastPredictionsResponse>
{
  constructor(public inputData: string) {
    super("msdyn_TriggerForecastPredictions");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerForecastPredictions`;

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

  async parseResponse(response: Response): Promise<msdyn_TriggerForecastPredictionsResponse> {
    // No return value (204 No Content)
    return new msdyn_TriggerForecastPredictionsResponse();
  }
}

/**
 * msdyn_TriggerForecastPredictions response message
 */
export class msdyn_TriggerForecastPredictionsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_TriggerForecastPredictions");
  }

  static fromResponse(_data: unknown): msdyn_TriggerForecastPredictionsResponse {
    return new msdyn_TriggerForecastPredictionsResponse();
  }
}
