import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * SchedulePrediction request message
 *
 * Web API Action: SchedulePrediction
 */
export class SchedulePredictionRequest
  extends OrganizationRequest
  implements Executable<SchedulePredictionResponse>
{
  constructor(
    public msdyn_aimodelId: string,
    public version: string,
    public predictImmediately: boolean,
    public cleanupRequired: boolean
  ) {
    super("SchedulePrediction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.SchedulePrediction`;

    const body: Record<string, unknown> = {
      version: this.version,
      predictImmediately: this.predictImmediately,
      cleanupRequired: this.cleanupRequired,
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

  async parseResponse(response: Response): Promise<SchedulePredictionResponse> {
    const data = await response.json();
    return SchedulePredictionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_aimodelId,
      version: this.version,
      predictImmediately: this.predictImmediately,
      cleanupRequired: this.cleanupRequired,
    };
  }
}

/**
 * SchedulePrediction response message
 */
export class SchedulePredictionResponse extends OrganizationResponse {
  constructor(public result: SchedulePredictionResponse) {
    super("SchedulePrediction");
  }

  static fromResponse(data: unknown): SchedulePredictionResponse {
    return new SchedulePredictionResponse((data as any).value);
  }
}
