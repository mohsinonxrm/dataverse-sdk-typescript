import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CreateAutonomousEmailResponse as msdyn_CreateAutonomousEmailResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateAutonomousEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateAutonomousEmailRequestParameters {
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
      SourceContextEntity: this.Parameters.SourceContextEntity,
      Entity: this.Parameters.Entity,
      StandardizedIntent: this.Parameters.StandardizedIntent,
      IntentFamilyId: this.Parameters.IntentFamilyId,
      FallbackEmailTemplateId: this.Parameters.FallbackEmailTemplateId,
      SuggestionType: this.Parameters.SuggestionType,
      SenderEntity: this.Parameters.SenderEntity,
      SuggestionSubtype: this.Parameters.SuggestionSubtype,
      UseCopilotRecommendedTemplate: this.Parameters.UseCopilotRecommendedTemplate,
      SuggestionResponse: this.Parameters.SuggestionResponse,
      AutomationLevel: this.Parameters.AutomationLevel,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CreateAutonomousEmailResponse.fromResponse(text ? JSON.parse(text) : {});
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
