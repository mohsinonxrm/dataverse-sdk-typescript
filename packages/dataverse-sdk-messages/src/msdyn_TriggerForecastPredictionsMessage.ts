import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TriggerForecastPredictions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TriggerForecastPredictionsRequestParameters {
  InputData: string;
}

/**
 * msdyn_TriggerForecastPredictions request message
 *
 * Web API Action: msdyn_TriggerForecastPredictions
 */
export class msdyn_TriggerForecastPredictionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerForecastPredictionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_TriggerForecastPredictionsRequestParameters>;

  constructor(parameters: msdyn_TriggerForecastPredictionsRequestParameters) {
    super("msdyn_TriggerForecastPredictions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerForecastPredictions`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
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

  parseResponse(_response: Response): Promise<msdyn_TriggerForecastPredictionsResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_TriggerForecastPredictionsResponse());
  }
}

/**
 * msdyn_TriggerForecastPredictions response message
 */
export class msdyn_TriggerForecastPredictionsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_TriggerForecastPredictions");
  }

  static fromResponse(_data?: unknown): msdyn_TriggerForecastPredictionsResponse {
    return new msdyn_TriggerForecastPredictionsResponse();
  }
}
