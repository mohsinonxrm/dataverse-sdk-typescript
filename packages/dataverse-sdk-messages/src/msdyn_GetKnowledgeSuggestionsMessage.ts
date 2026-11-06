import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetKnowledgeSuggestionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetKnowledgeSuggestions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetKnowledgeSuggestionsResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_GetKnowledgeSuggestions response message
 *
 * `result` is the value the msdyn_GetKnowledgeSuggestions action returns (see {@link msdyn_GetKnowledgeSuggestionsResult}).
 */
export class msdyn_GetKnowledgeSuggestionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetKnowledgeSuggestionsResult) {
    super("msdyn_GetKnowledgeSuggestions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetKnowledgeSuggestionsResponse {
    return new msdyn_GetKnowledgeSuggestionsResponse(data as msdyn_GetKnowledgeSuggestionsResult);
  }
}
