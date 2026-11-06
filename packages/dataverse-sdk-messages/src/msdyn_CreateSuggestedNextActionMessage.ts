import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CreateSuggestedNextActionResponse as msdyn_CreateSuggestedNextActionResponseData } from "./types/index.js";

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
    public entity: EntityReference | AnyEntityPayload | undefined,
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
}

/**
 * msdyn_CreateSuggestedNextAction response message
 */
export class msdyn_CreateSuggestedNextActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateSuggestedNextActionResponseData) {
    super("msdyn_CreateSuggestedNextAction");
  }

  static fromResponse(data: unknown): msdyn_CreateSuggestedNextActionResponse {
    return new msdyn_CreateSuggestedNextActionResponse(
      responseObject<msdyn_CreateSuggestedNextActionResponseData>(data)
    );
  }
}
