import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_AIEvaluationMetricsWrapperResponse as msdyn_AIEvaluationMetricsWrapperResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_AIEvaluationMetricsWrapper message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AIEvaluationMetricsWrapperRequestParameters {
  request: string;
}

/**
 * msdyn_AIEvaluationMetricsWrapper request message
 *
 * Web API Action: msdyn_AIEvaluationMetricsWrapper
 */
export class msdyn_AIEvaluationMetricsWrapperRequest
  extends OrganizationRequest
  implements Executable<msdyn_AIEvaluationMetricsWrapperResponse>
{
  declare readonly Parameters: Readonly<msdyn_AIEvaluationMetricsWrapperRequestParameters>;

  constructor(parameters: msdyn_AIEvaluationMetricsWrapperRequestParameters) {
    super("msdyn_AIEvaluationMetricsWrapper", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIEvaluationMetricsWrapper`;

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

  async parseResponse(response: Response): Promise<msdyn_AIEvaluationMetricsWrapperResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_AIEvaluationMetricsWrapperResponse.fromResponse({});
    return msdyn_AIEvaluationMetricsWrapperResponse.fromResponse(await response.json());
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
