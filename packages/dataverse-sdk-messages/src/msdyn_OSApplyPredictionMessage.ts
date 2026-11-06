import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_OSApplyPrediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSApplyPredictionRequestParameters {
  AutoScheduleTrainingConfig?: string;
}

/**
 * msdyn_OSApplyPrediction request message
 *
 * Web API Action: msdyn_OSApplyPrediction
 */
export class msdyn_OSApplyPredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSApplyPredictionResponse>
{
  declare readonly Parameters: Readonly<msdyn_OSApplyPredictionRequestParameters>;

  constructor(parameters: msdyn_OSApplyPredictionRequestParameters = {}) {
    super("msdyn_OSApplyPrediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSApplyPrediction`;

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

  async parseResponse(response: Response): Promise<msdyn_OSApplyPredictionResponse> {
    // No return value (204 No Content)
    return new msdyn_OSApplyPredictionResponse();
  }
}

/**
 * msdyn_OSApplyPrediction response message
 */
export class msdyn_OSApplyPredictionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_OSApplyPrediction");
  }

  static fromResponse(_data: unknown): msdyn_OSApplyPredictionResponse {
    return new msdyn_OSApplyPredictionResponse();
  }
}
