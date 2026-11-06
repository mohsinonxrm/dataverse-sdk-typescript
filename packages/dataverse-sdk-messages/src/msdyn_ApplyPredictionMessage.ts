import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ApplyPrediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ApplyPredictionRequestParameters {
  AutoScheduleTrainingConfig?: string;
}

/**
 * msdyn_ApplyPrediction request message
 *
 * Web API Action: msdyn_ApplyPrediction
 */
export class msdyn_ApplyPredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_ApplyPredictionResponse>
{
  declare readonly Parameters: Readonly<msdyn_ApplyPredictionRequestParameters>;

  constructor(parameters: msdyn_ApplyPredictionRequestParameters = {}) {
    super("msdyn_ApplyPrediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ApplyPrediction`;

    const body = requestBody({
      AutoScheduleTrainingConfig: this.Parameters.AutoScheduleTrainingConfig,
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

  async parseResponse(response: Response): Promise<msdyn_ApplyPredictionResponse> {
    // No return value (204 No Content)
    return new msdyn_ApplyPredictionResponse();
  }
}

/**
 * msdyn_ApplyPrediction response message
 */
export class msdyn_ApplyPredictionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ApplyPrediction");
  }

  static fromResponse(_data: unknown): msdyn_ApplyPredictionResponse {
    return new msdyn_ApplyPredictionResponse();
  }
}
