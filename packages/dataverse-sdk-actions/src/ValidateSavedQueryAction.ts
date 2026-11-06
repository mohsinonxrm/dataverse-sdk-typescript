import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ValidateSavedQuery action
 */
export interface ValidateSavedQueryResponse {
  // No content returned
}

/**
 * ValidateSavedQuery action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.savedquery))
 */
export class ValidateSavedQueryAction implements Executable<ValidateSavedQueryResponse> {
  constructor(
    public readonly fetchXml: string,
    public readonly queryType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/savedqueries/Microsoft.Dynamics.CRM.ValidateSavedQuery`;

    const body: Record<string, unknown> = {
      FetchXml: this.fetchXml,
      QueryType: this.queryType,
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

  async parseResponse(response: Response): Promise<ValidateSavedQueryResponse> {
    // No return value (204 No Content)
    return {};
  }
}
