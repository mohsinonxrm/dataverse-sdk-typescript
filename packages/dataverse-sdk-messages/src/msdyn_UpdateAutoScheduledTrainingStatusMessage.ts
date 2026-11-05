import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateAutoScheduledTrainingStatus request message
 *
 * Web API Action: msdyn_UpdateAutoScheduledTrainingStatus
 */
export class msdyn_UpdateAutoScheduledTrainingStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateAutoScheduledTrainingStatusResponse>
{
  constructor(
    public autoScheduledTraining: boolean,
    public predictionName: string,
    public predictionType: string
  ) {
    super("msdyn_UpdateAutoScheduledTrainingStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateAutoScheduledTrainingStatus`;

    const body: Record<string, unknown> = {
      AutoScheduledTraining: this.autoScheduledTraining,
      PredictionName: this.predictionName,
      PredictionType: this.predictionType,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_UpdateAutoScheduledTrainingStatusResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateAutoScheduledTrainingStatusResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AutoScheduledTraining: this.autoScheduledTraining,
      PredictionName: this.predictionName,
      PredictionType: this.predictionType,
    };
  }
}

/**
 * msdyn_UpdateAutoScheduledTrainingStatus response message
 */
export class msdyn_UpdateAutoScheduledTrainingStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateAutoScheduledTrainingStatus");
  }

  static fromResponse(_data: unknown): msdyn_UpdateAutoScheduledTrainingStatusResponse {
    return new msdyn_UpdateAutoScheduledTrainingStatusResponse();
  }
}
