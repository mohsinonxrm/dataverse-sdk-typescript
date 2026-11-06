import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_retryevaluation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_retryevaluationRequestParameters {
  msdyn_ExpirationDate: string;
}

/**
 * msdyn_retryevaluation request message
 *
 * Web API Action: msdyn_retryevaluation
 *
 * The first argument is the id of the msdyn_evaluation record to call it on.
 */
export class msdyn_retryevaluationRequest
  extends OrganizationRequest
  implements Executable<msdyn_retryevaluationResponse>
{
  declare readonly Parameters: Readonly<msdyn_retryevaluationRequestParameters>;

  constructor(
    public msdyn_evaluationId: string,
    parameters: msdyn_retryevaluationRequestParameters
  ) {
    super("msdyn_retryevaluation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_evaluations(${this.msdyn_evaluationId})/Microsoft.Dynamics.CRM.msdyn_retryevaluation`;

    const body = requestBody({
      msdyn_ExpirationDate: this.Parameters.msdyn_ExpirationDate,
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

  parseResponse(_response: Response): Promise<msdyn_retryevaluationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_retryevaluationResponse());
  }
}

/**
 * msdyn_retryevaluation response message
 */
export class msdyn_retryevaluationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_retryevaluation");
  }

  static fromResponse(_data?: unknown): msdyn_retryevaluationResponse {
    return new msdyn_retryevaluationResponse();
  }
}
