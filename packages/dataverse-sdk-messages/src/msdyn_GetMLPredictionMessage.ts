import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetMLPrediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMLPredictionRequestParameters {
  msdyn_input: string;
  msdyn_predictiontype: number;
}

/**
 * msdyn_GetMLPrediction request message
 *
 * Web API Action: msdyn_GetMLPrediction
 */
export class msdyn_GetMLPredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetMLPredictionResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetMLPredictionRequestParameters>;

  constructor(parameters: msdyn_GetMLPredictionRequestParameters) {
    super("msdyn_GetMLPrediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMLPrediction`;

    const body = requestBody({
      msdyn_input: this.Parameters.msdyn_input,
      msdyn_predictiontype: this.Parameters.msdyn_predictiontype,
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

  async parseResponse(response: Response): Promise<msdyn_GetMLPredictionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetMLPredictionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetMLPrediction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetMLPredictionResult {
  "@odata.context"?: string;
  msdyn_prediction: string;
  msdyn_status: number;
}

/**
 * msdyn_GetMLPrediction response message
 *
 * `result` is the value the msdyn_GetMLPrediction action returns (see {@link msdyn_GetMLPredictionResult}).
 */
export class msdyn_GetMLPredictionResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMLPredictionResult) {
    super("msdyn_GetMLPrediction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetMLPredictionResponse {
    return new msdyn_GetMLPredictionResponse(data as msdyn_GetMLPredictionResult);
  }
}
