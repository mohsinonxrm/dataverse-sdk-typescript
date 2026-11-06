import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateSurveyBotTopics action
 */
export interface msdyn_UpdateSurveyBotTopicsResponse {
  // No content returned
}

/**
 * msdyn_UpdateSurveyBotTopics action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bot)
 *
 * The first argument is the id of the bot record to call it on.
 */
export class msdyn_UpdateSurveyBotTopicsAction implements Executable<msdyn_UpdateSurveyBotTopicsResponse> {
  constructor(public readonly botId: string) {}

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

  async parseResponse(response: Response): Promise<msdyn_UpdateSurveyBotTopicsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_UpdateSurveyBotTopicsResponse;
  }
}
