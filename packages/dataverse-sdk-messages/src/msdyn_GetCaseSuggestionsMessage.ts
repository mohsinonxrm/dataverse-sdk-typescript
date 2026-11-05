import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetCaseSuggestionsResponse as msdyn_GetCaseSuggestionsResponseData } from "./types/index.js";

/**
 * msdyn_GetCaseSuggestions request message
 *
 * Web API Action: msdyn_GetCaseSuggestions
 */
export class msdyn_GetCaseSuggestionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCaseSuggestionsResponse>
{
  constructor(
    public incidentId: string,
    public count: number
  ) {
    super("msdyn_GetCaseSuggestions");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/incidents(${this.incidentId})/Microsoft.Dynamics.CRM.msdyn_GetCaseSuggestions`;

    const body: Record<string, unknown> = {
      Count: this.count,
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

  async parseResponse(response: Response): Promise<msdyn_GetCaseSuggestionsResponse> {
    const data = await response.json();
    return msdyn_GetCaseSuggestionsResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetCaseSuggestions response message
 */
export class msdyn_GetCaseSuggestionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCaseSuggestionsResponseData) {
    super("msdyn_GetCaseSuggestions");
  }

  static fromResponse(data: unknown): msdyn_GetCaseSuggestionsResponse {
    return new msdyn_GetCaseSuggestionsResponse(
      responseObject<msdyn_GetCaseSuggestionsResponseData>(data)
    );
  }
}
