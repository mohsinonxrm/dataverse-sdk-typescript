import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { BatchPredictionResponse as BatchPredictionResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<BatchPredictionResponse> {
    const data = await response.json();
    return BatchPredictionResponse.fromResponse(data);
  }
}

/**
 * BatchPrediction response message
 */
export class BatchPredictionResponse extends OrganizationResponse {
  constructor(public result: BatchPredictionResponseData) {
    super("BatchPrediction");
  }

  static fromResponse(data: unknown): BatchPredictionResponse {
    return new BatchPredictionResponse(responseObject<BatchPredictionResponseData>(data));
  }
}
