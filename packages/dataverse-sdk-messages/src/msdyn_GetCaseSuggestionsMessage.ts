import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetCaseSuggestionsResponse as msdyn_GetCaseSuggestionsResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetCaseSuggestionsResponse.fromResponse(text ? JSON.parse(text) : {});
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
