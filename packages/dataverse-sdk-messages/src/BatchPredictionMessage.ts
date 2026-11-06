import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return BatchPredictionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the BatchPrediction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface BatchPredictionResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * BatchPrediction response message
 *
 * `result` is the value the BatchPrediction action returns (see {@link BatchPredictionResult}).
 */
export class BatchPredictionResponse extends OrganizationResponse {
  constructor(public result: BatchPredictionResult) {
    super("BatchPrediction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): BatchPredictionResponse {
    return new BatchPredictionResponse(data as BatchPredictionResult);
  }
}
