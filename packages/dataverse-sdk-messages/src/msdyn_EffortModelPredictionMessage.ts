import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_EffortModelPrediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EffortModelPredictionRequestParameters {
  InputRequest: string;
  AiModelId: string;
}

/**
 * msdyn_EffortModelPrediction request message
 *
 * Web API Action: msdyn_EffortModelPrediction
 */
export class msdyn_EffortModelPredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_EffortModelPredictionResponse>
{
  declare readonly Parameters: Readonly<msdyn_EffortModelPredictionRequestParameters>;

  constructor(parameters: msdyn_EffortModelPredictionRequestParameters) {
    super("msdyn_EffortModelPrediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EffortModelPrediction`;

    const body = requestBody({
      InputRequest: this.Parameters.InputRequest,
      AiModelId: this.Parameters.AiModelId,
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

  async parseResponse(response: Response): Promise<msdyn_EffortModelPredictionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_EffortModelPredictionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_EffortModelPrediction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EffortModelPredictionResult {
  "@odata.context"?: string;
  PredictionResult: string;
}

/**
 * msdyn_EffortModelPrediction response message
 *
 * `result` is the value the msdyn_EffortModelPrediction action returns (see {@link msdyn_EffortModelPredictionResult}).
 */
export class msdyn_EffortModelPredictionResponse extends OrganizationResponse {
  constructor(public result: msdyn_EffortModelPredictionResult) {
    super("msdyn_EffortModelPrediction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_EffortModelPredictionResponse {
    return new msdyn_EffortModelPredictionResponse(data as msdyn_EffortModelPredictionResult);
  }
}
