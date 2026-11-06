import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_PredictFieldsBasedOnRules message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PredictFieldsBasedOnRulesRequestParameters {
  msdyn_ScenarioName?: string;
  msdyn_MatchingRuleId?: string;
  msdyn_Context?: EntityReference | AnyEntityPayload;
  msdyn_Target: EntityReference | AnyEntityPayload;
  msdyn_ContextGenerationParameters?: string;
}

/**
 * msdyn_PredictFieldsBasedOnRules request message
 *
 * Web API Action: msdyn_PredictFieldsBasedOnRules
 */
export class msdyn_PredictFieldsBasedOnRulesRequest
  extends OrganizationRequest
  implements Executable<msdyn_PredictFieldsBasedOnRulesResponse>
{
  declare readonly Parameters: Readonly<msdyn_PredictFieldsBasedOnRulesRequestParameters>;

  constructor(parameters: msdyn_PredictFieldsBasedOnRulesRequestParameters) {
    super("msdyn_PredictFieldsBasedOnRules", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PredictFieldsBasedOnRules`;

    const body = requestBody({
      msdyn_ScenarioName: this.Parameters.msdyn_ScenarioName,
      msdyn_MatchingRuleId: this.Parameters.msdyn_MatchingRuleId,
      msdyn_Context: this.Parameters.msdyn_Context,
      msdyn_Target: this.Parameters.msdyn_Target,
      msdyn_ContextGenerationParameters: this.Parameters.msdyn_ContextGenerationParameters,
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

  async parseResponse(response: Response): Promise<msdyn_PredictFieldsBasedOnRulesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_PredictFieldsBasedOnRulesResponse.fromResponse({});
    return msdyn_PredictFieldsBasedOnRulesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_PredictFieldsBasedOnRules response message
 */
export class msdyn_PredictFieldsBasedOnRulesResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("msdyn_PredictFieldsBasedOnRules");
  }

  static fromResponse(data: unknown): msdyn_PredictFieldsBasedOnRulesResponse {
    return new msdyn_PredictFieldsBasedOnRulesResponse(
      responseObject<Record<string, unknown>>(data)
    );
  }
}
