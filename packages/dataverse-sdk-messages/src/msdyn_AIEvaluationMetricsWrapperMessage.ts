import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_AIEvaluationMetricsWrapperResponse as msdyn_AIEvaluationMetricsWrapperResponseData } from "./types/index.js";

/**
 * msdyn_AIEvaluationMetricsWrapper request message
 *
 * Web API Action: msdyn_AIEvaluationMetricsWrapper
 */
export class msdyn_AIEvaluationMetricsWrapperRequest
  extends OrganizationRequest
  implements Executable<msdyn_AIEvaluationMetricsWrapperResponse>
{
  constructor(public request: string) {
    super("msdyn_AIEvaluationMetricsWrapper");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIEvaluationMetricsWrapper`;

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

  async parseResponse(response: Response): Promise<msdyn_AIEvaluationMetricsWrapperResponse> {
    const data = await response.json();
    return msdyn_AIEvaluationMetricsWrapperResponse.fromResponse(data);
  }
}

/**
 * msdyn_AIEvaluationMetricsWrapper response message
 */
export class msdyn_AIEvaluationMetricsWrapperResponse extends OrganizationResponse {
  constructor(public result: msdyn_AIEvaluationMetricsWrapperResponseData) {
    super("msdyn_AIEvaluationMetricsWrapper");
  }

  static fromResponse(data: unknown): msdyn_AIEvaluationMetricsWrapperResponse {
    return new msdyn_AIEvaluationMetricsWrapperResponse(
      responseObject<msdyn_AIEvaluationMetricsWrapperResponseData>(data)
    );
  }
}
