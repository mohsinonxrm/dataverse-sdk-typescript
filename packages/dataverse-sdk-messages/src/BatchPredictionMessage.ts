import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * BatchPrediction request message
 *
 * Web API Action: BatchPrediction
 */
export class BatchPredictionRequest
  extends OrganizationRequest
  implements Executable<BatchPredictionResponse>
{
  constructor(
    public msdyn_aimodelId: string,
    public version: string
  ) {
    super("BatchPrediction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.BatchPrediction`;

    const body: Record<string, unknown> = {
      version: this.version,
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

  async parseResponse(response: Response): Promise<BatchPredictionResponse> {
    const data = await response.json();
    return BatchPredictionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_aimodelId,
      version: this.version,
    };
  }
}

/**
 * BatchPrediction response message
 */
export class BatchPredictionResponse extends OrganizationResponse {
  constructor(public result: BatchPredictionResponse) {
    super("BatchPrediction");
  }

  static fromResponse(data: unknown): BatchPredictionResponse {
    return new BatchPredictionResponse((data as any).value);
  }
}
