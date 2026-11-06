import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_createevaluationplanbatchResponse as msdyn_createevaluationplanbatchResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_createevaluationplanbatch message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_createevaluationplanbatchRequestParameters {
  EvaluationPlanRunId: string;
}

/**
 * msdyn_createevaluationplanbatch request message
 *
 * Web API Action: msdyn_createevaluationplanbatch
 */
export class msdyn_createevaluationplanbatchRequest
  extends OrganizationRequest
  implements Executable<msdyn_createevaluationplanbatchResponse>
{
  declare readonly Parameters: Readonly<msdyn_createevaluationplanbatchRequestParameters>;

  constructor(parameters: msdyn_createevaluationplanbatchRequestParameters) {
    super("msdyn_createevaluationplanbatch", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_createevaluationplanbatch`;

    const body = requestBody({
      EvaluationPlanRunId: this.Parameters.EvaluationPlanRunId,
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

  async parseResponse(response: Response): Promise<msdyn_createevaluationplanbatchResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_createevaluationplanbatchResponse.fromResponse({});
    return msdyn_createevaluationplanbatchResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_createevaluationplanbatch response message
 */
export class msdyn_createevaluationplanbatchResponse extends OrganizationResponse {
  constructor(public result: msdyn_createevaluationplanbatchResponseData) {
    super("msdyn_createevaluationplanbatch");
  }

  static fromResponse(data: unknown): msdyn_createevaluationplanbatchResponse {
    return new msdyn_createevaluationplanbatchResponse(
      responseObject<msdyn_createevaluationplanbatchResponseData>(data)
    );
  }
}
