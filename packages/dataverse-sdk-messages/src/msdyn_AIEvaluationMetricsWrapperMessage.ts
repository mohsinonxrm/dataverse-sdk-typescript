import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_AIEvaluationMetricsWrapperResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_AIEvaluationMetricsWrapper action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AIEvaluationMetricsWrapperResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * msdyn_AIEvaluationMetricsWrapper response message
 *
 * `result` is the value the msdyn_AIEvaluationMetricsWrapper action returns (see {@link msdyn_AIEvaluationMetricsWrapperResult}).
 */
export class msdyn_AIEvaluationMetricsWrapperResponse extends OrganizationResponse {
  constructor(public result: msdyn_AIEvaluationMetricsWrapperResult) {
    super("msdyn_AIEvaluationMetricsWrapper");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_AIEvaluationMetricsWrapperResponse {
    return new msdyn_AIEvaluationMetricsWrapperResponse(
      data as msdyn_AIEvaluationMetricsWrapperResult
    );
  }
}
