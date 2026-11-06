import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_CreateProactiveSimpleJourney action
 */
export interface CCaaS_CreateProactiveSimpleJourneyResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_CreateProactiveSimpleJourney action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateProactiveSimpleJourneyActionParameters {
  ProactiveEngagementConfigId: string;
  ApiVersion: string;
  ContactsFileId: string;
}

/**
 * CCaaS_CreateProactiveSimpleJourney action
 *
 * Unbound action
 */
export class CCaaS_CreateProactiveSimpleJourneyAction implements Executable<CCaaS_CreateProactiveSimpleJourneyResponse> {
  constructor(public readonly parameters: CCaaS_CreateProactiveSimpleJourneyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateProactiveSimpleJourney`;

    const body = requestBody({
      ProactiveEngagementConfigId: this.parameters.ProactiveEngagementConfigId,
      ApiVersion: this.parameters.ApiVersion,
      ContactsFileId: this.parameters.ContactsFileId,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateProactiveSimpleJourneyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_CreateProactiveSimpleJourneyResponse;
    return (await response.json()) as CCaaS_CreateProactiveSimpleJourneyResponse;
  }
}
