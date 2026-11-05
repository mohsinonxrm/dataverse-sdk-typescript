import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_RetrieveCadenceSuggestions request message
 *
 * Web API Action: msdyn_RetrieveCadenceSuggestions
 */
export class msdyn_RetrieveCadenceSuggestionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveCadenceSuggestionsResponse>
{
  constructor(
    public entityReference: EntityReference,
    public activityType: number,
    public linkedActivityId: string,
    public stepType: number
  ) {
    super("msdyn_RetrieveCadenceSuggestions");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveCadenceSuggestions`;

    const body: Record<string, unknown> = {
      EntityReference: this.entityReference,
      ActivityType: this.activityType,
      LinkedActivityId: this.linkedActivityId,
      StepType: this.stepType,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveCadenceSuggestionsResponse> {
    const data = await response.json();
    return msdyn_RetrieveCadenceSuggestionsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityReference: this.entityReference,
      ActivityType: this.activityType,
      LinkedActivityId: this.linkedActivityId,
      StepType: this.stepType,
    };
  }
}

/**
 * msdyn_RetrieveCadenceSuggestions response message
 */
export class msdyn_RetrieveCadenceSuggestionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveCadenceSuggestionsResponse) {
    super("msdyn_RetrieveCadenceSuggestions");
  }

  static fromResponse(data: unknown): msdyn_RetrieveCadenceSuggestionsResponse {
    return new msdyn_RetrieveCadenceSuggestionsResponse((data as any).value);
  }
}
