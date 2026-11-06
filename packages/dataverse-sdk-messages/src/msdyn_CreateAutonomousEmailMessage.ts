import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CreateAutonomousEmailResponse as msdyn_CreateAutonomousEmailResponseData } from "./types/index.js";

/**
 * msdyn_CreateAutonomousEmail request message
 *
 * Web API Action: msdyn_CreateAutonomousEmail
 */
export class msdyn_CreateAutonomousEmailRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateAutonomousEmailResponse>
{
  constructor(
    public sourceContextEntity: EntityReference | AnyEntityPayload | undefined,
    public entity: EntityReference | AnyEntityPayload | undefined,
    public standardizedIntent: string | undefined,
    public intentFamilyId: string | undefined,
    public fallbackEmailTemplateId: string | undefined,
    public suggestionType: string,
    public senderEntity: EntityReference | AnyEntityPayload,
    public suggestionSubtype: string,
    public useCopilotRecommendedTemplate?: boolean,
    public suggestionResponse?: string,
    public automationLevel?: string
  ) {
    super("msdyn_CreateAutonomousEmail");
  }

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
    return msdyn_CreateAutonomousEmailResponse.fromResponse(data);
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
