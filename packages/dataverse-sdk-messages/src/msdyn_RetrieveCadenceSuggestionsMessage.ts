import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_RetrieveCadenceSuggestions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveCadenceSuggestionsRequestParameters {
  EntityReference: EntityReference | AnyEntityPayload;
  ActivityType: number;
  LinkedActivityId?: string;
  StepType: number;
}

/**
 * msdyn_RetrieveCadenceSuggestions request message
 *
 * Web API Action: msdyn_RetrieveCadenceSuggestions
 */
export class msdyn_RetrieveCadenceSuggestionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveCadenceSuggestionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveCadenceSuggestionsRequestParameters>;

  constructor(parameters: msdyn_RetrieveCadenceSuggestionsRequestParameters) {
    super("msdyn_RetrieveCadenceSuggestions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveCadenceSuggestions`;

    const body = requestBody({
      EntityReference: this.Parameters.EntityReference,
      ActivityType: this.Parameters.ActivityType,
      LinkedActivityId: this.Parameters.LinkedActivityId,
      StepType: this.Parameters.StepType,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveCadenceSuggestionsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveCadenceSuggestionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveCadenceSuggestions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveCadenceSuggestionsResult {
  "@odata.context"?: string;
  Suggestions: string;
}

/**
 * msdyn_RetrieveCadenceSuggestions response message
 *
 * `result` is the value the msdyn_RetrieveCadenceSuggestions action returns (see {@link msdyn_RetrieveCadenceSuggestionsResult}).
 */
export class msdyn_RetrieveCadenceSuggestionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveCadenceSuggestionsResult) {
    super("msdyn_RetrieveCadenceSuggestions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveCadenceSuggestionsResponse {
    return new msdyn_RetrieveCadenceSuggestionsResponse(
      data as msdyn_RetrieveCadenceSuggestionsResult
    );
  }
}
