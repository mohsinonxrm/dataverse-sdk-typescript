import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_RetrieveKnowledgeSuggestionsResponse as msdyn_RetrieveKnowledgeSuggestionsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveKnowledgeSuggestions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKnowledgeSuggestionsRequestParameters {
  Count?: number;
  Target: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_RetrieveKnowledgeSuggestions request message
 *
 * Web API Action: msdyn_RetrieveKnowledgeSuggestions
 */
export class msdyn_RetrieveKnowledgeSuggestionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKnowledgeSuggestionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveKnowledgeSuggestionsRequestParameters>;

  constructor(parameters: msdyn_RetrieveKnowledgeSuggestionsRequestParameters) {
    super("msdyn_RetrieveKnowledgeSuggestions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKnowledgeSuggestions`;

    const body = requestBody({
      Count: this.Parameters.Count,
      Target: this.Parameters.Target,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKnowledgeSuggestionsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_RetrieveKnowledgeSuggestionsResponse.fromResponse(text ? JSON.parse(text) : {});
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
