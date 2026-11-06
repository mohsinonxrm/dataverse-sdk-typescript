import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse as msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse.fromResponse({});
    return msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesDataQualityAgent_ExecuteFieldPrediction response message
 */
export class msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponseData) {
    super("msdyn_SalesDataQualityAgent_ExecuteFieldPrediction");
  }

  static fromResponse(data: unknown): msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse {
    return new msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse(
      responseObject<msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponseData>(data)
    );
  }
}
