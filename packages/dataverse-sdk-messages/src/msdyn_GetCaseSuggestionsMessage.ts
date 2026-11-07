import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetCaseSuggestions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCaseSuggestionsRequestParameters {
  Count?: number;
}

/**
 * msdyn_GetCaseSuggestions request message
 *
 * Web API Action: msdyn_GetCaseSuggestions
 *
 * The first argument is the id of the incident record to call it on.
 */
export class msdyn_GetCaseSuggestionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCaseSuggestionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetCaseSuggestionsRequestParameters>;

  constructor(
    public incidentId: string,
    parameters: msdyn_GetCaseSuggestionsRequestParameters = {}
  ) {
    super("msdyn_GetCaseSuggestions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/incidents(${this.incidentId})/Microsoft.Dynamics.CRM.msdyn_GetCaseSuggestions`;

    const body = requestBody({
      Count: this.Parameters.Count,
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

  async parseResponse(response: Response): Promise<msdyn_GetCaseSuggestionsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetCaseSuggestionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetCaseSuggestions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCaseSuggestionsResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_GetCaseSuggestions response message
 *
 * `result` is the value the msdyn_GetCaseSuggestions action returns (see {@link msdyn_GetCaseSuggestionsResult}).
 */
export class msdyn_GetCaseSuggestionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCaseSuggestionsResult) {
    super("msdyn_GetCaseSuggestions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetCaseSuggestionsResponse {
    return new msdyn_GetCaseSuggestionsResponse(data as msdyn_GetCaseSuggestionsResult);
  }
}
