import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateEntityAttributePredictionRules action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateEntityAttributePredictionRulesResponse {
  "@odata.context"?: string;
  SettingsLink: string;
}

/**
 * Parameters of the msdyn_UpdateEntityAttributePredictionRules action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateEntityAttributePredictionRulesActionParameters {
  BotConversationId?: string;
  RuleName: string;
  ConditionsXml: string;
  PredictedFields: string;
}

/**
 * msdyn_UpdateEntityAttributePredictionRules action
 *
 * Unbound action
 */
export class msdyn_UpdateEntityAttributePredictionRulesAction implements Executable<msdyn_UpdateEntityAttributePredictionRulesResponse> {
  constructor(
    public readonly parameters: msdyn_UpdateEntityAttributePredictionRulesActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateEntityAttributePredictionRules`;

    const body = requestBody({
      BotConversationId: this.parameters.BotConversationId,
      RuleName: this.parameters.RuleName,
      ConditionsXml: this.parameters.ConditionsXml,
      PredictedFields: this.parameters.PredictedFields,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_UpdateEntityAttributePredictionRulesResponse;
  }
}
