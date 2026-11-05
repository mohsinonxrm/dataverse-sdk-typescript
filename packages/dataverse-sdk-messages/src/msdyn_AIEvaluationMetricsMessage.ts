import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_AIEvaluationMetricsResponse as msdyn_AIEvaluationMetricsResponseData } from "./types/index.js";

/**
 * msdyn_AIEvaluationMetrics request message
 *
 * Web API Action: msdyn_AIEvaluationMetrics
 */
export class msdyn_AIEvaluationMetricsRequest
  extends OrganizationRequest
  implements Executable<msdyn_AIEvaluationMetricsResponse>
{
  constructor(public request: string) {
    super("msdyn_AIEvaluationMetrics");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIEvaluationMetrics`;

    const body: Record<string, unknown> = {
      request: this.request,
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

  async parseResponse(response: Response): Promise<msdyn_AIEvaluationMetricsResponse> {
    const data = await response.json();
    return msdyn_AIEvaluationMetricsResponse.fromResponse(data);
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
