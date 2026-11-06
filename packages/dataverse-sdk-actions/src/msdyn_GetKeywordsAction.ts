import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetKeywords action
 */
export interface msdyn_GetKeywordsResponse {
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_GetKeywords action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKeywordsActionParameters {
  msdyn_entityType?: string;
  msdyn_activityId?: string;
  msdyn_queryLocale?: string;
  msdyn_userquery: string;
  msdyn_entityName?: string;
}

/**
 * msdyn_GetKeywords action
 *
 * Unbound action
 */
export class msdyn_GetKeywordsAction implements Executable<msdyn_GetKeywordsResponse> {
  constructor(public readonly parameters: msdyn_GetKeywordsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKeywords`;

    const body = requestBody({
      msdyn_entityType: this.parameters.msdyn_entityType,
      msdyn_activityId: this.parameters.msdyn_activityId,
      msdyn_queryLocale: this.parameters.msdyn_queryLocale,
      msdyn_userquery: this.parameters.msdyn_userquery,
      msdyn_entityName: this.parameters.msdyn_entityName,
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

  async parseResponse(response: Response): Promise<msdyn_GetKeywordsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetKeywordsResponse;
    return (await response.json()) as msdyn_GetKeywordsResponse;
  }
}
