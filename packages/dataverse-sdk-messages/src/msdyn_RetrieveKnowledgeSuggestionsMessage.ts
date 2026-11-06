import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_RetrieveKnowledgeSuggestionsResponse as msdyn_RetrieveKnowledgeSuggestionsResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveKnowledgeSuggestions request message
 *
 * Web API Action: msdyn_RetrieveKnowledgeSuggestions
 */
export class msdyn_RetrieveKnowledgeSuggestionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKnowledgeSuggestionsResponse>
{
  constructor(
    public count: number | undefined,
    public target: EntityReference | AnyEntityPayload
  ) {
    super("msdyn_RetrieveKnowledgeSuggestions");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKnowledgeSuggestions`;

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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKnowledgeSuggestionsResponse> {
    const data = await response.json();
    return msdyn_RetrieveKnowledgeSuggestionsResponse.fromResponse(data);
  }
}

/**
 * msdyn_RetrieveKnowledgeSuggestions response message
 */
export class msdyn_RetrieveKnowledgeSuggestionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKnowledgeSuggestionsResponseData) {
    super("msdyn_RetrieveKnowledgeSuggestions");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKnowledgeSuggestionsResponse {
    return new msdyn_RetrieveKnowledgeSuggestionsResponse(
      responseObject<msdyn_RetrieveKnowledgeSuggestionsResponseData>(data)
    );
  }
}
