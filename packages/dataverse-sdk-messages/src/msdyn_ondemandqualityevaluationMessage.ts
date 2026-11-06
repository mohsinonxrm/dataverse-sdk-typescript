import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ondemandqualityevaluationResponse as msdyn_ondemandqualityevaluationResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ondemandqualityevaluationResponse.fromResponse({});
    return msdyn_ondemandqualityevaluationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ondemandqualityevaluation response message
 */
export class msdyn_ondemandqualityevaluationResponse extends OrganizationResponse {
  constructor(public result: msdyn_ondemandqualityevaluationResponseData) {
    super("msdyn_ondemandqualityevaluation");
  }

  static fromResponse(data: unknown): msdyn_ondemandqualityevaluationResponse {
    return new msdyn_ondemandqualityevaluationResponse(
      responseObject<msdyn_ondemandqualityevaluationResponseData>(data)
    );
  }
}
