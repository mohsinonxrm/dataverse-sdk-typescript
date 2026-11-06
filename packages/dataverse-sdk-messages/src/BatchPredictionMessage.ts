import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { BatchPredictionResponse as BatchPredictionResponseData } from "./types/index.js";

/**
 * Parameters of the BatchPrediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BatchPredictionRequestParameters {
  version: string;
}

/**
 * BatchPrediction request message
 *
 * Web API Action: BatchPrediction
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class BatchPredictionRequest
  extends OrganizationRequest
  implements Executable<BatchPredictionResponse>
{
  declare readonly Parameters: Readonly<BatchPredictionRequestParameters>;

  constructor(
    public msdyn_aimodelId: string,
    parameters: BatchPredictionRequestParameters
  ) {
    super("BatchPrediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.BatchPrediction`;

    const body = requestBody({
      version: this.Parameters.version,
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

  async parseResponse(response: Response): Promise<BatchPredictionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return BatchPredictionResponse.fromResponse({});
    return BatchPredictionResponse.fromResponse(await response.json());
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
