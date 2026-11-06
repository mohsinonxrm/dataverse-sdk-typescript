import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TriggerForecastRecompute message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TriggerForecastRecomputeRequestParameters {
  InputData: string;
}

/**
 * msdyn_TriggerForecastRecompute request message
 *
 * Web API Action: msdyn_TriggerForecastRecompute
 */
export class msdyn_TriggerForecastRecomputeRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerForecastRecomputeResponse>
{
  declare readonly Parameters: Readonly<msdyn_TriggerForecastRecomputeRequestParameters>;

  constructor(parameters: msdyn_TriggerForecastRecomputeRequestParameters) {
    super("msdyn_TriggerForecastRecompute", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerForecastRecompute`;

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
