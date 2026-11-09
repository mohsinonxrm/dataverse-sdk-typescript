import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_ExecuteFieldPrediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_ExecuteFieldPredictionRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_ExecuteFieldPrediction request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_ExecuteFieldPrediction
 */
export class msdyn_SalesDataQualityAgent_ExecuteFieldPredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_ExecuteFieldPredictionRequestParameters>;

  constructor(parameters: msdyn_SalesDataQualityAgent_ExecuteFieldPredictionRequestParameters) {
    super("msdyn_SalesDataQualityAgent_ExecuteFieldPrediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_ExecuteFieldPrediction`;

    const body = requestBody({
      RequestJson: this.Parameters.RequestJson,
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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesDataQualityAgent_ExecuteFieldPrediction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_ExecuteFieldPrediction response message
 *
 * `result` is the value the msdyn_SalesDataQualityAgent_ExecuteFieldPrediction action returns (see {@link msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResult}).
 */
export class msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResult) {
    super("msdyn_SalesDataQualityAgent_ExecuteFieldPrediction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse {
    return new msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse(
      data as msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResult
    );
  }
}
