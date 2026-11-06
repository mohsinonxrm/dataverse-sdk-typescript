import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesDataQualityAgent_ExecuteFieldPrediction action
 */
export interface msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse {
  ResponseJson: string;
}

/**
 * Parameters of the msdyn_SalesDataQualityAgent_ExecuteFieldPrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_ExecuteFieldPredictionActionParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_ExecuteFieldPrediction action
 *
 * Unbound action
 */
export class msdyn_SalesDataQualityAgent_ExecuteFieldPredictionAction implements Executable<msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse> {
  constructor(
    public readonly parameters: msdyn_SalesDataQualityAgent_ExecuteFieldPredictionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_ExecuteFieldPrediction`;

    const body = requestBody({
      RequestJson: this.parameters.RequestJson,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse;
    return (await response.json()) as msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse;
  }
}
