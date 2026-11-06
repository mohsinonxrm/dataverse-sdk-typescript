import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_AIEvaluationMetricsResponse as msdyn_AIEvaluationMetricsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_AIEvaluationMetrics message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AIEvaluationMetricsRequestParameters {
  request: string;
}

/**
 * msdyn_AIEvaluationMetrics request message
 *
 * Web API Action: msdyn_AIEvaluationMetrics
 */
export class msdyn_AIEvaluationMetricsRequest
  extends OrganizationRequest
  implements Executable<msdyn_AIEvaluationMetricsResponse>
{
  declare readonly Parameters: Readonly<msdyn_AIEvaluationMetricsRequestParameters>;

  constructor(parameters: msdyn_AIEvaluationMetricsRequestParameters) {
    super("msdyn_AIEvaluationMetrics", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIEvaluationMetrics`;

    const body = requestBody({
      request: this.Parameters.request,
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

  async parseResponse(response: Response): Promise<msdyn_AIEvaluationMetricsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_AIEvaluationMetricsResponse.fromResponse({});
    return msdyn_AIEvaluationMetricsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_AIEvaluationMetrics response message
 */
export class msdyn_AIEvaluationMetricsResponse extends OrganizationResponse {
  constructor(public result: msdyn_AIEvaluationMetricsResponseData) {
    super("msdyn_AIEvaluationMetrics");
  }

  static fromResponse(data: unknown): msdyn_AIEvaluationMetricsResponse {
    return new msdyn_AIEvaluationMetricsResponse(
      responseObject<msdyn_AIEvaluationMetricsResponseData>(data)
    );
  }
}
