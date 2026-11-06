import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_createevaluationplanbatchResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_createevaluationplanbatch action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_createevaluationplanbatchResult {
  "@odata.context"?: string;
  Status: boolean;
}

/**
 * msdyn_createevaluationplanbatch response message
 *
 * `result` is the value the msdyn_createevaluationplanbatch action returns (see {@link msdyn_createevaluationplanbatchResult}).
 */
export class msdyn_createevaluationplanbatchResponse extends OrganizationResponse {
  constructor(public result: msdyn_createevaluationplanbatchResult) {
    super("msdyn_createevaluationplanbatch");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_createevaluationplanbatchResponse {
    return new msdyn_createevaluationplanbatchResponse(
      data as msdyn_createevaluationplanbatchResult
    );
  }
}
