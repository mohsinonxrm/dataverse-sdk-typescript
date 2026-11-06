import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_StartEvaluationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_StartEvaluation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_StartEvaluationResult {
  "@odata.context"?: string;
  jobId: string;
}

/**
 * msdyn_StartEvaluation response message
 *
 * `result` is the value the msdyn_StartEvaluation action returns (see {@link msdyn_StartEvaluationResult}).
 */
export class msdyn_StartEvaluationResponse extends OrganizationResponse {
  constructor(public result: msdyn_StartEvaluationResult) {
    super("msdyn_StartEvaluation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_StartEvaluationResponse {
    return new msdyn_StartEvaluationResponse(data as msdyn_StartEvaluationResult);
  }
}
