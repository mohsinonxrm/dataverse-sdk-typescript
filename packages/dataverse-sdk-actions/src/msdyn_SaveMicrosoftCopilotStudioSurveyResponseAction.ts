import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SaveMicrosoftCopilotStudioSurveyResponse action
 */
export interface msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse {
  ErrorResponse: string;
}

/**
 * msdyn_SaveMicrosoftCopilotStudioSurveyResponse action
 *
 * Unbound action
 */
export class msdyn_SaveMicrosoftCopilotStudioSurveyResponseAction implements Executable<msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse> {
  constructor(public readonly inputParams: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveMicrosoftCopilotStudioSurveyResponse`;

    const body: Record<string, unknown> = {
      InputParams: this.inputParams,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse> {
    const data = await response.json();
    return data as msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse;
  }
}
