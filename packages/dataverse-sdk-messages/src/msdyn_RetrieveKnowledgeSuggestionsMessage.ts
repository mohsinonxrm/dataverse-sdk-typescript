import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
    public count: number,
    public target: EntityReference
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrieveKnowledgeSuggestionsResponse> {
    const data = await response.json();
    return msdyn_RetrieveKnowledgeSuggestionsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Count: this.count,
      Target: this.target,
    };
  }
}

/**
 * msdyn_RetrieveKnowledgeSuggestions response message
 */
export class msdyn_RetrieveKnowledgeSuggestionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKnowledgeSuggestionsResponse) {
    super("msdyn_RetrieveKnowledgeSuggestions");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKnowledgeSuggestionsResponse {
    return new msdyn_RetrieveKnowledgeSuggestionsResponse((data as any).value);
  }
}
