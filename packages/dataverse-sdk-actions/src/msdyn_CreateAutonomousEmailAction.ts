import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_CreateAutonomousEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateAutonomousEmailResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_CreateAutonomousEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateAutonomousEmailActionParameters {
  AutomationLevel?: string;
  SuggestionResponse?: string;
  CustomAgentEmailTemplateGroupId?: string;
  Entity?: EntityReference | AnyEntityPayload;
  SuggestionType: string;
  FallbackEmailTemplateId?: string;
  UseCopilotRecommendedTemplate?: boolean;
  LanguageLocale?: string;
  SenderEntity: EntityReference | AnyEntityPayload;
  Tools?: string;
  ScenarioName?: string;
  CustomAgentEmailTemplateId?: string;
  RunId?: string;
  IntentFamilyId?: string;
  SuggestionSubtype: string;
  StandardizedIntent?: string;
  SourceContextEntity?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CreateAutonomousEmail action
 *
 * Unbound action
 */
export class msdyn_CreateAutonomousEmailAction implements Executable<msdyn_CreateAutonomousEmailResponse> {
  constructor(public readonly parameters: msdyn_CreateAutonomousEmailActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAutonomousEmail`;

    const body = requestBody({
      AutomationLevel: this.parameters.AutomationLevel,
      SuggestionResponse: this.parameters.SuggestionResponse,
      CustomAgentEmailTemplateGroupId: this.parameters.CustomAgentEmailTemplateGroupId,
      Entity: this.parameters.Entity,
      SuggestionType: this.parameters.SuggestionType,
      FallbackEmailTemplateId: this.parameters.FallbackEmailTemplateId,
      UseCopilotRecommendedTemplate: this.parameters.UseCopilotRecommendedTemplate,
      LanguageLocale: this.parameters.LanguageLocale,
      SenderEntity: this.parameters.SenderEntity,
      Tools: this.parameters.Tools,
      ScenarioName: this.parameters.ScenarioName,
      CustomAgentEmailTemplateId: this.parameters.CustomAgentEmailTemplateId,
      RunId: this.parameters.RunId,
      IntentFamilyId: this.parameters.IntentFamilyId,
      SuggestionSubtype: this.parameters.SuggestionSubtype,
      StandardizedIntent: this.parameters.StandardizedIntent,
      SourceContextEntity: this.parameters.SourceContextEntity,
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

  async parseResponse(response: Response): Promise<msdyn_CreateAutonomousEmailResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CreateAutonomousEmailResponse;
  }
}
