import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_CreateSuggestedNextAction request message
 *
 * Web API Action: msdyn_CreateSuggestedNextAction
 */
export class msdyn_CreateSuggestedNextActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateSuggestedNextActionResponse>
{
  constructor(
    public suggestionSubtype: string,
    public entity: EntityReference,
    public draftEmailId: string,
    public suggestionType: string
  ) {
    super("msdyn_CreateSuggestedNextAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSuggestedNextAction`;

    const body: Record<string, unknown> = {
      SuggestionSubtype: this.suggestionSubtype,
      Entity: this.entity,
      DraftEmailId: this.draftEmailId,
      SuggestionType: this.suggestionType,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSuggestedNextActionResponse> {
    const data = await response.json();
    return msdyn_CreateSuggestedNextActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SuggestionSubtype: this.suggestionSubtype,
      Entity: this.entity,
      DraftEmailId: this.draftEmailId,
      SuggestionType: this.suggestionType,
    };
  }
}

/**
 * msdyn_CreateSuggestedNextAction response message
 */
export class msdyn_CreateSuggestedNextActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateSuggestedNextActionResponse) {
    super("msdyn_CreateSuggestedNextAction");
  }

  static fromResponse(data: unknown): msdyn_CreateSuggestedNextActionResponse {
    return new msdyn_CreateSuggestedNextActionResponse((data as any).value);
  }
}
