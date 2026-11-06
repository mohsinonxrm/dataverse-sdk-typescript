import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetEvaluationProgress message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEvaluationProgressRequestParameters {
  recordId: string;
}

/**
 * msdyn_GetEvaluationProgress request message
 *
 * Web API Action: msdyn_GetEvaluationProgress
 */
export class msdyn_GetEvaluationProgressRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEvaluationProgressResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetEvaluationProgressRequestParameters>;

  constructor(parameters: msdyn_GetEvaluationProgressRequestParameters) {
    super("msdyn_GetEvaluationProgress", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEvaluationProgress`;

    const body = requestBody({
      recordId: this.Parameters.recordId,
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

  async parseResponse(response: Response): Promise<msdyn_GetEvaluationProgressResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetEvaluationProgressResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetEvaluationProgress action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetEvaluationProgressResult {
  "@odata.context"?: string;
  status: string;
}

/**
 * msdyn_GetEvaluationProgress response message
 *
 * `result` is the value the msdyn_GetEvaluationProgress action returns (see {@link msdyn_GetEvaluationProgressResult}).
 */
export class msdyn_GetEvaluationProgressResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetEvaluationProgressResult) {
    super("msdyn_GetEvaluationProgress");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetEvaluationProgressResponse {
    return new msdyn_GetEvaluationProgressResponse(data as msdyn_GetEvaluationProgressResult);
  }
}
