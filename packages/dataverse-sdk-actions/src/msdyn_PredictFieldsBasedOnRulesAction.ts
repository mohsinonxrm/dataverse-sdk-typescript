import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_PredictFieldsBasedOnRules action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_PredictFieldsBasedOnRulesResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * Parameters of the msdyn_PredictFieldsBasedOnRules action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PredictFieldsBasedOnRulesActionParameters {
  msdyn_ScenarioName?: string;
  msdyn_MatchingRuleId?: string;
  msdyn_Context?: EntityReference | AnyEntityPayload;
  msdyn_Target: EntityReference | AnyEntityPayload;
  msdyn_ContextGenerationParameters?: string;
}

/**
 * msdyn_PredictFieldsBasedOnRules action
 *
 * Unbound action
 */
export class msdyn_PredictFieldsBasedOnRulesAction implements Executable<msdyn_PredictFieldsBasedOnRulesResponse> {
  constructor(public readonly parameters: msdyn_PredictFieldsBasedOnRulesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PredictFieldsBasedOnRules`;

    const body = requestBody({
      msdyn_ScenarioName: this.parameters.msdyn_ScenarioName,
      msdyn_MatchingRuleId: this.parameters.msdyn_MatchingRuleId,
      msdyn_Context: this.parameters.msdyn_Context,
      msdyn_Target: this.parameters.msdyn_Target,
      msdyn_ContextGenerationParameters: this.parameters.msdyn_ContextGenerationParameters,
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
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as msdyn_PredictFieldsBasedOnRulesResponse;
  }
}
