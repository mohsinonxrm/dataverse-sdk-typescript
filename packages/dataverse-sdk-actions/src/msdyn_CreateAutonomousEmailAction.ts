import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_CreateAutonomousEmail action
 */
export interface msdyn_CreateAutonomousEmailResponse {
  Result: string;
}

/**
 * msdyn_CreateAutonomousEmail action
 *
 * Unbound action
 */
export class msdyn_CreateAutonomousEmailAction implements Executable<msdyn_CreateAutonomousEmailResponse> {
  constructor(
    public readonly sourceContextEntity: EntityReference,
    public readonly entity: EntityReference,
    public readonly standardizedIntent: string,
    public readonly intentFamilyId: string,
    public readonly fallbackEmailTemplateId: string,
    public readonly suggestionType: string,
    public readonly senderEntity: EntityReference,
    public readonly suggestionSubtype: string,
    public readonly useCopilotRecommendedTemplate: boolean,
    public readonly suggestionResponse: string,
    public readonly automationLevel: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAutonomousEmail`;

    const body: Record<string, unknown> = {
      SourceContextEntity: this.sourceContextEntity,
      Entity: this.entity,
      StandardizedIntent: this.standardizedIntent,
      IntentFamilyId: this.intentFamilyId,
      FallbackEmailTemplateId: this.fallbackEmailTemplateId,
      SuggestionType: this.suggestionType,
      SenderEntity: this.senderEntity,
      SuggestionSubtype: this.suggestionSubtype,
      UseCopilotRecommendedTemplate: this.useCopilotRecommendedTemplate,
      SuggestionResponse: this.suggestionResponse,
      AutomationLevel: this.automationLevel,
    };

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
    const data = await response.json();
    return data as msdyn_CreateAutonomousEmailResponse;
  }
}
