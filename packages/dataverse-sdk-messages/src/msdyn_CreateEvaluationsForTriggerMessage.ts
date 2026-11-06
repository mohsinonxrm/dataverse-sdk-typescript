import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CreateEvaluationsForTrigger message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateEvaluationsForTriggerRequestParameters {
  msdyn_EvaluationTrigger: string;
  msdyn_EntityLogicalName: string;
  msdyn_EntityId: string;
}

/**
 * msdyn_CreateEvaluationsForTrigger request message
 *
 * Web API Action: msdyn_CreateEvaluationsForTrigger
 */
export class msdyn_CreateEvaluationsForTriggerRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateEvaluationsForTriggerResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateEvaluationsForTriggerRequestParameters>;

  constructor(parameters: msdyn_CreateEvaluationsForTriggerRequestParameters) {
    super("msdyn_CreateEvaluationsForTrigger", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateEvaluationsForTrigger`;

    const body = requestBody({
      msdyn_EvaluationTrigger: this.Parameters.msdyn_EvaluationTrigger,
      msdyn_EntityLogicalName: this.Parameters.msdyn_EntityLogicalName,
      msdyn_EntityId: this.Parameters.msdyn_EntityId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateEvaluationsForTriggerResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CreateEvaluationsForTriggerResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateEvaluationsForTrigger action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateEvaluationsForTriggerResult {
  "@odata.context"?: string;
  msdyn_EvaluationIds: string;
}

/**
 * msdyn_CreateEvaluationsForTrigger response message
 *
 * `result` is the value the msdyn_CreateEvaluationsForTrigger action returns (see {@link msdyn_CreateEvaluationsForTriggerResult}).
 */
export class msdyn_CreateEvaluationsForTriggerResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateEvaluationsForTriggerResult) {
    super("msdyn_CreateEvaluationsForTrigger");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateEvaluationsForTriggerResponse {
    return new msdyn_CreateEvaluationsForTriggerResponse(
      data as msdyn_CreateEvaluationsForTriggerResult
    );
  }
}
