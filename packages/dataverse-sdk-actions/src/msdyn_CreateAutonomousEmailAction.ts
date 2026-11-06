import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_CreateAutonomousEmail action
 */
export interface msdyn_CreateAutonomousEmailResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_CreateAutonomousEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateAutonomousEmailActionParameters {
  SourceContextEntity?: EntityReference | AnyEntityPayload;
  Entity?: EntityReference | AnyEntityPayload;
  StandardizedIntent?: string;
  IntentFamilyId?: string;
  FallbackEmailTemplateId?: string;
  SuggestionType: string;
  SenderEntity: EntityReference | AnyEntityPayload;
  SuggestionSubtype: string;
  UseCopilotRecommendedTemplate?: boolean;
  SuggestionResponse?: string;
  AutomationLevel?: string;
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
      SourceContextEntity: this.parameters.SourceContextEntity,
      Entity: this.parameters.Entity,
      StandardizedIntent: this.parameters.StandardizedIntent,
      IntentFamilyId: this.parameters.IntentFamilyId,
      FallbackEmailTemplateId: this.parameters.FallbackEmailTemplateId,
      SuggestionType: this.parameters.SuggestionType,
      SenderEntity: this.parameters.SenderEntity,
      SuggestionSubtype: this.parameters.SuggestionSubtype,
      UseCopilotRecommendedTemplate: this.parameters.UseCopilotRecommendedTemplate,
      SuggestionResponse: this.parameters.SuggestionResponse,
      AutomationLevel: this.parameters.AutomationLevel,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreateAutonomousEmailResponse;
    return (await response.json()) as msdyn_CreateAutonomousEmailResponse;
  }
}
