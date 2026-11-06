import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_HandleTrainingStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_HandleTrainingStatusRequestParameters {
  CurentModel: string;
  PreviousModel?: string;
  PredictionScheduledOperation?: string;
  TrainingResult: string;
}

/**
 * msdyn_HandleTrainingStatus request message
 *
 * Web API Action: msdyn_HandleTrainingStatus
 */
export class msdyn_HandleTrainingStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_HandleTrainingStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_HandleTrainingStatusRequestParameters>;

  constructor(parameters: msdyn_HandleTrainingStatusRequestParameters) {
    super("msdyn_HandleTrainingStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_HandleTrainingStatus`;

    const body = requestBody({
      CurentModel: this.Parameters.CurentModel,
      PreviousModel: this.Parameters.PreviousModel,
      PredictionScheduledOperation: this.Parameters.PredictionScheduledOperation,
      TrainingResult: this.Parameters.TrainingResult,
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

  async parseResponse(response: Response): Promise<msdyn_HandleTrainingStatusResponse> {
    // No return value (204 No Content)
    return new msdyn_HandleTrainingStatusResponse();
  }
}

/**
 * msdyn_HandleTrainingStatus response message
 */
export class msdyn_HandleTrainingStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_HandleTrainingStatus");
  }

  static fromResponse(_data: unknown): msdyn_HandleTrainingStatusResponse {
    return new msdyn_HandleTrainingStatusResponse();
  }
}
