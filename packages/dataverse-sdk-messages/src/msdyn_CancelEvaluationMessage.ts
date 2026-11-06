import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CancelEvaluationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CancelEvaluation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CancelEvaluationResult {
  "@odata.context"?: string;
  status: string;
}

/**
 * msdyn_CancelEvaluation response message
 *
 * `result` is the value the msdyn_CancelEvaluation action returns (see {@link msdyn_CancelEvaluationResult}).
 */
export class msdyn_CancelEvaluationResponse extends OrganizationResponse {
  constructor(public result: msdyn_CancelEvaluationResult) {
    super("msdyn_CancelEvaluation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CancelEvaluationResponse {
    return new msdyn_CancelEvaluationResponse(data as msdyn_CancelEvaluationResult);
  }
}
