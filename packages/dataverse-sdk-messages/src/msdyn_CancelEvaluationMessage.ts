import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CancelEvaluationResponse as msdyn_CancelEvaluationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CancelEvaluation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CancelEvaluationRequestParameters {
  recordId: string;
}

/**
 * msdyn_CancelEvaluation request message
 *
 * Web API Action: msdyn_CancelEvaluation
 */
export class msdyn_CancelEvaluationRequest
  extends OrganizationRequest
  implements Executable<msdyn_CancelEvaluationResponse>
{
  declare readonly Parameters: Readonly<msdyn_CancelEvaluationRequestParameters>;

  constructor(parameters: msdyn_CancelEvaluationRequestParameters) {
    super("msdyn_CancelEvaluation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelEvaluation`;

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

  async parseResponse(response: Response): Promise<msdyn_CancelEvaluationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CancelEvaluationResponse.fromResponse({});
    return msdyn_CancelEvaluationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CancelEvaluation response message
 */
export class msdyn_CancelEvaluationResponse extends OrganizationResponse {
  constructor(public result: msdyn_CancelEvaluationResponseData) {
    super("msdyn_CancelEvaluation");
  }

  static fromResponse(data: unknown): msdyn_CancelEvaluationResponse {
    return new msdyn_CancelEvaluationResponse(
      responseObject<msdyn_CancelEvaluationResponseData>(data)
    );
  }
}
