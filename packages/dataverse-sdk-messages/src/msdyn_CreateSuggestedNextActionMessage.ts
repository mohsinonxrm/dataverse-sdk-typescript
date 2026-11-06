import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CreateSuggestedNextActionResponse as msdyn_CreateSuggestedNextActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateSuggestedNextAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateSuggestedNextActionRequestParameters {
  SuggestionSubtype: string;
  Entity?: EntityReference | AnyEntityPayload;
  DraftEmailId: string;
  SuggestionType: string;
}

/**
 * msdyn_CreateSuggestedNextAction request message
 *
 * Web API Action: msdyn_CreateSuggestedNextAction
 */
export class msdyn_CreateSuggestedNextActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateSuggestedNextActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateSuggestedNextActionRequestParameters>;

  constructor(parameters: msdyn_CreateSuggestedNextActionRequestParameters) {
    super("msdyn_CreateSuggestedNextAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSuggestedNextAction`;

    const body = requestBody({
      SuggestionSubtype: this.Parameters.SuggestionSubtype,
      Entity: this.Parameters.Entity,
      DraftEmailId: this.Parameters.DraftEmailId,
      SuggestionType: this.Parameters.SuggestionType,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSuggestedNextActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CreateSuggestedNextActionResponse.fromResponse(text ? JSON.parse(text) : {});
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
