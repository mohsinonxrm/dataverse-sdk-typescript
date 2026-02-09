import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetCaseSuggestionsResponse> {
    const data = await response.json();
    return msdyn_GetCaseSuggestionsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.incidentId,
      Count: this.count,
    };
  }
}

/**
 * msdyn_GetCaseSuggestions response message
 */
export class msdyn_GetCaseSuggestionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCaseSuggestionsResponse) {
    super("msdyn_GetCaseSuggestions");
  }

  static fromResponse(data: unknown): msdyn_GetCaseSuggestionsResponse {
    return new msdyn_GetCaseSuggestionsResponse((data as any).value);
  }
}
