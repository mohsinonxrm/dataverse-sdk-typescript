import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return msdyn_PredictFieldsBasedOnRulesResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_PredictFieldsBasedOnRulesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_PredictFieldsBasedOnRules action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_PredictFieldsBasedOnRulesResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * msdyn_PredictFieldsBasedOnRules response message
 *
 * `result` is the value the msdyn_PredictFieldsBasedOnRules action returns (see {@link msdyn_PredictFieldsBasedOnRulesResult}).
 */
export class msdyn_PredictFieldsBasedOnRulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_PredictFieldsBasedOnRulesResult) {
    super("msdyn_PredictFieldsBasedOnRules");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_PredictFieldsBasedOnRulesResponse {
    return new msdyn_PredictFieldsBasedOnRulesResponse(
      (data ?? null) as msdyn_PredictFieldsBasedOnRulesResult
    );
  }
}
