import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_GetKnowledgeSuggestionsResponse as msdyn_GetKnowledgeSuggestionsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetKnowledgeSuggestions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKnowledgeSuggestionsRequestParameters {
  Count?: number;
  Target: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetKnowledgeSuggestions request message
 *
 * Web API Action: msdyn_GetKnowledgeSuggestions
 */
export class msdyn_GetKnowledgeSuggestionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetKnowledgeSuggestionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetKnowledgeSuggestionsRequestParameters>;

  constructor(parameters: msdyn_GetKnowledgeSuggestionsRequestParameters) {
    super("msdyn_GetKnowledgeSuggestions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKnowledgeSuggestions`;

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

  async parseResponse(response: Response): Promise<msdyn_GetKnowledgeSuggestionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetKnowledgeSuggestionsResponse.fromResponse({});
    return msdyn_GetKnowledgeSuggestionsResponse.fromResponse(await response.json());
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
