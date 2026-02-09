import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ApplyPrediction request message
 *
 * Web API Action: msdyn_ApplyPrediction
 */
export class msdyn_ApplyPredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_ApplyPredictionResponse>
{
  constructor(public autoScheduleTrainingConfig: string) {
    super("msdyn_ApplyPrediction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ApplyPrediction`;

    const body: Record<string, unknown> = {
      AutoScheduleTrainingConfig: this.autoScheduleTrainingConfig,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ApplyPredictionResponse> {
    // No return value (204 No Content)
    return new msdyn_ApplyPredictionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AutoScheduleTrainingConfig: this.autoScheduleTrainingConfig,
    };
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
