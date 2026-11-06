import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { UnschedulePredictionResponse as UnschedulePredictionResponseData } from "./types/index.js";

/**
 * UnschedulePrediction request message
 *
 * Web API Action: UnschedulePrediction
 */
export class UnschedulePredictionRequest
  extends OrganizationRequest
  implements Executable<UnschedulePredictionResponse>
{
  constructor(
    public msdyn_aimodelId: string,
    public version: string,
    public skipStatusUpdate?: boolean
  ) {
    super("UnschedulePrediction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.UnschedulePrediction`;

    const body: Record<string, unknown> = {
      version: this.version,
      skipStatusUpdate: this.skipStatusUpdate,
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

  async parseResponse(response: Response): Promise<UnschedulePredictionResponse> {
    const data = await response.json();
    return UnschedulePredictionResponse.fromResponse(data);
  }
}

/**
 * UnschedulePrediction response message
 */
export class UnschedulePredictionResponse extends OrganizationResponse {
  constructor(public result: UnschedulePredictionResponseData) {
    super("UnschedulePrediction");
  }

  static fromResponse(data: unknown): UnschedulePredictionResponse {
    return new UnschedulePredictionResponse(responseObject<UnschedulePredictionResponseData>(data));
  }
}
