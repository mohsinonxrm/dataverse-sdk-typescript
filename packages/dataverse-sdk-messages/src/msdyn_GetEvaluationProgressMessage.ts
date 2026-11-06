import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetEvaluationProgressResponse as msdyn_GetEvaluationProgressResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetEvaluationProgressResponse.fromResponse({});
    return msdyn_GetEvaluationProgressResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetEvaluationProgress response message
 */
export class msdyn_GetEvaluationProgressResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetEvaluationProgressResponseData) {
    super("msdyn_GetEvaluationProgress");
  }

  static fromResponse(data: unknown): msdyn_GetEvaluationProgressResponse {
    return new msdyn_GetEvaluationProgressResponse(
      responseObject<msdyn_GetEvaluationProgressResponseData>(data)
    );
  }
}
