import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpdateEntityAttributePredictionRulesResponse as msdyn_UpdateEntityAttributePredictionRulesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_UpdateEntityAttributePredictionRules message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateEntityAttributePredictionRulesRequestParameters {
  BotConversationId?: string;
  RuleName: string;
  ConditionsXml: string;
  PredictedFields: string;
}

/**
 * msdyn_UpdateEntityAttributePredictionRules request message
 *
 * Web API Action: msdyn_UpdateEntityAttributePredictionRules
 */
export class msdyn_UpdateEntityAttributePredictionRulesRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateEntityAttributePredictionRulesResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateEntityAttributePredictionRulesRequestParameters>;

  constructor(parameters: msdyn_UpdateEntityAttributePredictionRulesRequestParameters) {
    super("msdyn_UpdateEntityAttributePredictionRules", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateEntityAttributePredictionRules`;

    const body = requestBody({
      BotConversationId: this.Parameters.BotConversationId,
      RuleName: this.Parameters.RuleName,
      ConditionsXml: this.Parameters.ConditionsXml,
      PredictedFields: this.Parameters.PredictedFields,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_UpdateEntityAttributePredictionRulesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_UpdateEntityAttributePredictionRulesResponse.fromResponse({});
    return msdyn_UpdateEntityAttributePredictionRulesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_UpdateEntityAttributePredictionRules response message
 */
export class msdyn_UpdateEntityAttributePredictionRulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateEntityAttributePredictionRulesResponseData) {
    super("msdyn_UpdateEntityAttributePredictionRules");
  }

  static fromResponse(data: unknown): msdyn_UpdateEntityAttributePredictionRulesResponse {
    return new msdyn_UpdateEntityAttributePredictionRulesResponse(
      responseObject<msdyn_UpdateEntityAttributePredictionRulesResponseData>(data)
    );
  }
}
