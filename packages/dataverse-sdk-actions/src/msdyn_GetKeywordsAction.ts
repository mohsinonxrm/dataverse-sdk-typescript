import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetKeywords action
 */
export interface msdyn_GetKeywordsResponse {
  msdyn_response: string;
}

/**
 * msdyn_GetKeywords action
 *
 * Unbound action
 */
export class msdyn_GetKeywordsAction implements Executable<msdyn_GetKeywordsResponse> {
  constructor(
    public readonly msdyn_entityType: string,
    public readonly msdyn_activityId: string,
    public readonly msdyn_queryLocale: string,
    public readonly msdyn_userquery: string,
    public readonly msdyn_entityName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKeywords`;

    const body: Record<string, unknown> = {
      msdyn_entityType: this.msdyn_entityType,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_queryLocale: this.msdyn_queryLocale,
      msdyn_userquery: this.msdyn_userquery,
      msdyn_entityName: this.msdyn_entityName,
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

  async parseResponse(response: Response): Promise<msdyn_GetKeywordsResponse> {
    const data = await response.json();
    return data as msdyn_GetKeywordsResponse;
  }
}
