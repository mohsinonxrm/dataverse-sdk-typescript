import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateSurveyBotTopics request message
 *
 * Web API Action: msdyn_UpdateSurveyBotTopics
 *
 * The first argument is the id of the bot record to call it on.
 */
export class msdyn_UpdateSurveyBotTopicsRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateSurveyBotTopicsResponse>
{
  constructor(public botId: string) {
    super("msdyn_UpdateSurveyBotTopics");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.msdyn_UpdateSurveyBotTopics`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_UpdateSurveyBotTopicsResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_UpdateSurveyBotTopicsResponse());
  }
}

/**
 * msdyn_UpdateSurveyBotTopics response message
 */
export class msdyn_UpdateSurveyBotTopicsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateSurveyBotTopics");
  }

  static fromResponse(_data?: unknown): msdyn_UpdateSurveyBotTopicsResponse {
    return new msdyn_UpdateSurveyBotTopicsResponse();
  }
}
