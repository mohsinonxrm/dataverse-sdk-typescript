import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_GetKnowledgeSuggestionsResponse as msdyn_GetKnowledgeSuggestionsResponseData } from "./types/index.js";

/**
 * msdyn_GetKnowledgeSuggestions request message
 *
 * Web API Action: msdyn_GetKnowledgeSuggestions
 */
export class msdyn_GetKnowledgeSuggestionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetKnowledgeSuggestionsResponse>
{
  constructor(
    public count: number | undefined,
    public target: EntityReference | AnyEntityPayload
  ) {
    super("msdyn_GetKnowledgeSuggestions");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKnowledgeSuggestions`;

    const body: Record<string, unknown> = {
      Count: this.count,
      Target: this.target,
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

  async parseResponse(response: Response): Promise<msdyn_GetKnowledgeSuggestionsResponse> {
    const data = await response.json();
    return msdyn_GetKnowledgeSuggestionsResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetKnowledgeSuggestions response message
 */
export class msdyn_GetKnowledgeSuggestionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetKnowledgeSuggestionsResponseData) {
    super("msdyn_GetKnowledgeSuggestions");
  }

  static fromResponse(data: unknown): msdyn_GetKnowledgeSuggestionsResponse {
    return new msdyn_GetKnowledgeSuggestionsResponse(
      responseObject<msdyn_GetKnowledgeSuggestionsResponseData>(data)
    );
  }
}
