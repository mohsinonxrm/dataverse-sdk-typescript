import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetGPT3Prediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetGPT3PredictionRequestParameters {
  msdyn_input: string;
  msdyn_predictiontype: number;
}

/**
 * msdyn_GetGPT3Prediction request message
 *
 * Web API Action: msdyn_GetGPT3Prediction
 */
export class msdyn_GetGPT3PredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetGPT3PredictionResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetGPT3PredictionRequestParameters>;

  constructor(parameters: msdyn_GetGPT3PredictionRequestParameters) {
    super("msdyn_GetGPT3Prediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetGPT3Prediction`;

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

  async parseResponse(response: Response): Promise<msdyn_GetGPT3PredictionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetGPT3PredictionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetGPT3Prediction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetGPT3PredictionResult {
  "@odata.context"?: string;
  msdyn_prediction: string;
  msdyn_status: number;
}

/**
 * msdyn_GetGPT3Prediction response message
 *
 * `result` is the value the msdyn_GetGPT3Prediction action returns (see {@link msdyn_GetGPT3PredictionResult}).
 */
export class msdyn_GetGPT3PredictionResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetGPT3PredictionResult) {
    super("msdyn_GetGPT3Prediction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetGPT3PredictionResponse {
    return new msdyn_GetGPT3PredictionResponse(data as msdyn_GetGPT3PredictionResult);
  }
}
