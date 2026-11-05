import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    public skipStatusUpdate: boolean
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

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_aimodelId,
      version: this.version,
      skipStatusUpdate: this.skipStatusUpdate,
    };
  }
}

/**
 * UnschedulePrediction response message
 */
export class UnschedulePredictionResponse extends OrganizationResponse {
  constructor(public result: UnschedulePredictionResponse) {
    super("UnschedulePrediction");
  }

  static fromResponse(data: unknown): UnschedulePredictionResponse {
    return new UnschedulePredictionResponse((data as any).value);
  }
}
