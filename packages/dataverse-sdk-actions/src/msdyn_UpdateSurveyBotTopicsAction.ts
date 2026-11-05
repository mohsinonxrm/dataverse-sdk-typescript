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
    // No return value (204 No Content)
    return {};
  }
}
