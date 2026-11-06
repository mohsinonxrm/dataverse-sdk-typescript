import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OSApplyPrediction request message
 *
 * Web API Action: msdyn_OSApplyPrediction
 */
export class msdyn_OSApplyPredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSApplyPredictionResponse>
{
  constructor(public autoScheduleTrainingConfig?: string) {
    super("msdyn_OSApplyPrediction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSApplyPrediction`;

    const body: Record<string, unknown> = {
      AutoScheduleTrainingConfig: this.autoScheduleTrainingConfig,
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
