import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CreateAutonomousEmailResponse as msdyn_CreateAutonomousEmailResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateAutonomousEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateAutonomousEmailRequestParameters {
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
 * msdyn_CreateAutonomousEmail request message
 *
 * Web API Action: msdyn_CreateAutonomousEmail
 */
export class msdyn_CreateAutonomousEmailRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateAutonomousEmailResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateAutonomousEmailRequestParameters>;

  constructor(parameters: msdyn_CreateAutonomousEmailRequestParameters) {
    super("msdyn_CreateAutonomousEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAutonomousEmail`;

    const body = requestBody({
      AutomationLevel: this.Parameters.AutomationLevel,
      SuggestionResponse: this.Parameters.SuggestionResponse,
      CustomAgentEmailTemplateGroupId: this.Parameters.CustomAgentEmailTemplateGroupId,
      Entity: this.Parameters.Entity,
      SuggestionType: this.Parameters.SuggestionType,
      FallbackEmailTemplateId: this.Parameters.FallbackEmailTemplateId,
      UseCopilotRecommendedTemplate: this.Parameters.UseCopilotRecommendedTemplate,
      LanguageLocale: this.Parameters.LanguageLocale,
      SenderEntity: this.Parameters.SenderEntity,
      Tools: this.Parameters.Tools,
      ScenarioName: this.Parameters.ScenarioName,
      CustomAgentEmailTemplateId: this.Parameters.CustomAgentEmailTemplateId,
      RunId: this.Parameters.RunId,
      IntentFamilyId: this.Parameters.IntentFamilyId,
      SuggestionSubtype: this.Parameters.SuggestionSubtype,
      StandardizedIntent: this.Parameters.StandardizedIntent,
      SourceContextEntity: this.Parameters.SourceContextEntity,
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
    if (response.status === 204) return msdyn_CreateAutonomousEmailResponse.fromResponse({});
    return msdyn_CreateAutonomousEmailResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CreateAutonomousEmail response message
 */
export class msdyn_CreateAutonomousEmailResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateAutonomousEmailResponseData) {
    super("msdyn_CreateAutonomousEmail");
  }

  static fromResponse(data: unknown): msdyn_CreateAutonomousEmailResponse {
    return new msdyn_CreateAutonomousEmailResponse(
      responseObject<msdyn_CreateAutonomousEmailResponseData>(data)
    );
  }
}
