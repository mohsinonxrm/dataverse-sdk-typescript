import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ValidateSavedQuery action
 */
export interface ValidateSavedQueryResponse {
  // No content returned
}

/**
 * Parameters of the ValidateSavedQuery action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateSavedQueryActionParameters {
  FetchXml: string;
  QueryType: number;
}

/**
 * ValidateSavedQuery action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.savedquery))
 */
export class ValidateSavedQueryAction implements Executable<ValidateSavedQueryResponse> {
  constructor(public readonly parameters: ValidateSavedQueryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/savedqueries/Microsoft.Dynamics.CRM.ValidateSavedQuery`;

    const body = requestBody({
      FetchXml: this.parameters.FetchXml,
      QueryType: this.parameters.QueryType,
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

  async parseResponse(response: Response): Promise<ValidateSavedQueryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ValidateSavedQueryResponse;
    return (await response.json()) as ValidateSavedQueryResponse;
  }
}
