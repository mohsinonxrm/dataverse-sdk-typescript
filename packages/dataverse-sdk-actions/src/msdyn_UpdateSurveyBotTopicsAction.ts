import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_UpdateSurveyBotTopics action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdateSurveyBotTopicsResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_UpdateSurveyBotTopicsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
