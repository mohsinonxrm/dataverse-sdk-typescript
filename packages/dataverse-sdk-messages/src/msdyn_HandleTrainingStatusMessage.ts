import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_HandleTrainingStatus request message
 *
 * Web API Action: msdyn_HandleTrainingStatus
 */
export class msdyn_HandleTrainingStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_HandleTrainingStatusResponse>
{
  constructor(
    public curentModel: string,
    public previousModel: string | undefined,
    public predictionScheduledOperation: string | undefined,
    public trainingResult: string
  ) {
    super("msdyn_HandleTrainingStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_HandleTrainingStatus`;

    const body: Record<string, unknown> = {
      CurentModel: this.curentModel,
      PreviousModel: this.previousModel,
      PredictionScheduledOperation: this.predictionScheduledOperation,
      TrainingResult: this.trainingResult,
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
