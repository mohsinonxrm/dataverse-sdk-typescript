import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AIEvaluationMetricsResponse> {
    const data = await response.json();
    return msdyn_AIEvaluationMetricsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      request: this.request,
    };
  }
}

/**
 * msdyn_AIEvaluationMetrics response message
 */
export class msdyn_AIEvaluationMetricsResponse extends OrganizationResponse {
  constructor(public result: msdyn_AIEvaluationMetricsResponse) {
    super("msdyn_AIEvaluationMetrics");
  }

  static fromResponse(data: unknown): msdyn_AIEvaluationMetricsResponse {
    return new msdyn_AIEvaluationMetricsResponse((data as any).value);
  }
}
