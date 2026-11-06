import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_CreateProactiveSimpleJourney action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_CreateProactiveSimpleJourneyResponse = void;

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

  parseResponse(_response: Response): Promise<CCaaS_CreateProactiveSimpleJourneyResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
