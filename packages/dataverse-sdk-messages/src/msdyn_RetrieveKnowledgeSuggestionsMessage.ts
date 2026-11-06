import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveKnowledgeSuggestionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveKnowledgeSuggestions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveKnowledgeSuggestionsResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_RetrieveKnowledgeSuggestions response message
 *
 * `result` is the value the msdyn_RetrieveKnowledgeSuggestions action returns (see {@link msdyn_RetrieveKnowledgeSuggestionsResult}).
 */
export class msdyn_RetrieveKnowledgeSuggestionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKnowledgeSuggestionsResult) {
    super("msdyn_RetrieveKnowledgeSuggestions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveKnowledgeSuggestionsResponse {
    return new msdyn_RetrieveKnowledgeSuggestionsResponse(
      data as msdyn_RetrieveKnowledgeSuggestionsResult
    );
  }
}
