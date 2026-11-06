import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_CreateSuggestedNextAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateSuggestedNextActionRequestParameters {
  Entity?: EntityReference | AnyEntityPayload;
  SuggestionSubtype: string;
  RunId?: string;
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
      Entity: this.Parameters.Entity,
      SuggestionSubtype: this.Parameters.SuggestionSubtype,
      RunId: this.Parameters.RunId,
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
    // The body is the complex value, with its @odata.context
    return msdyn_CreateSuggestedNextActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateSuggestedNextAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateSuggestedNextActionResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_CreateSuggestedNextAction response message
 *
 * `result` is the value the msdyn_CreateSuggestedNextAction action returns (see {@link msdyn_CreateSuggestedNextActionResult}).
 */
export class msdyn_CreateSuggestedNextActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateSuggestedNextActionResult) {
    super("msdyn_CreateSuggestedNextAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateSuggestedNextActionResponse {
    return new msdyn_CreateSuggestedNextActionResponse(
      data as msdyn_CreateSuggestedNextActionResult
    );
  }
}
