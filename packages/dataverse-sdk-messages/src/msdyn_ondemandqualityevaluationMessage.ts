import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ondemandqualityevaluation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ondemandqualityevaluationRequestParameters {
  ConversationIds: string[];
  IsBulkEvaluation?: boolean;
  EvaluationPlanId: string;
}

/**
 * msdyn_ondemandqualityevaluation request message
 *
 * Web API Action: msdyn_ondemandqualityevaluation
 */
export class msdyn_ondemandqualityevaluationRequest
  extends OrganizationRequest
  implements Executable<msdyn_ondemandqualityevaluationResponse>
{
  declare readonly Parameters: Readonly<msdyn_ondemandqualityevaluationRequestParameters>;

  constructor(parameters: msdyn_ondemandqualityevaluationRequestParameters) {
    super("msdyn_ondemandqualityevaluation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ondemandqualityevaluation`;

    const body = requestBody({
      ConversationIds: this.Parameters.ConversationIds,
      IsBulkEvaluation: this.Parameters.IsBulkEvaluation,
      EvaluationPlanId: this.Parameters.EvaluationPlanId,
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

  async parseResponse(response: Response): Promise<msdyn_ondemandqualityevaluationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ondemandqualityevaluationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ondemandqualityevaluation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ondemandqualityevaluationResult {
  "@odata.context"?: string;
  ActionId: string;
  Error: string;
  SkipReason: string;
  Status: string;
}

/**
 * msdyn_ondemandqualityevaluation response message
 *
 * `result` is the value the msdyn_ondemandqualityevaluation action returns (see {@link msdyn_ondemandqualityevaluationResult}).
 */
export class msdyn_ondemandqualityevaluationResponse extends OrganizationResponse {
  constructor(public result: msdyn_ondemandqualityevaluationResult) {
    super("msdyn_ondemandqualityevaluation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ondemandqualityevaluationResponse {
    return new msdyn_ondemandqualityevaluationResponse(
      data as msdyn_ondemandqualityevaluationResult
    );
  }
}
