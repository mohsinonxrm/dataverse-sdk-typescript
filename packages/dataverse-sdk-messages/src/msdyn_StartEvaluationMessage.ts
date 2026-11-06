import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_StartEvaluationResponse as msdyn_StartEvaluationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_StartEvaluation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartEvaluationRequestParameters {
  recordId: string;
}

/**
 * msdyn_StartEvaluation request message
 *
 * Web API Action: msdyn_StartEvaluation
 */
export class msdyn_StartEvaluationRequest
  extends OrganizationRequest
  implements Executable<msdyn_StartEvaluationResponse>
{
  declare readonly Parameters: Readonly<msdyn_StartEvaluationRequestParameters>;

  constructor(parameters: msdyn_StartEvaluationRequestParameters) {
    super("msdyn_StartEvaluation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartEvaluation`;

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

  async parseResponse(response: Response): Promise<msdyn_StartEvaluationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_StartEvaluationResponse.fromResponse({});
    return msdyn_StartEvaluationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_StartEvaluation response message
 */
export class msdyn_StartEvaluationResponse extends OrganizationResponse {
  constructor(public result: msdyn_StartEvaluationResponseData) {
    super("msdyn_StartEvaluation");
  }

  static fromResponse(data: unknown): msdyn_StartEvaluationResponse {
    return new msdyn_StartEvaluationResponse(
      responseObject<msdyn_StartEvaluationResponseData>(data)
    );
  }
}
