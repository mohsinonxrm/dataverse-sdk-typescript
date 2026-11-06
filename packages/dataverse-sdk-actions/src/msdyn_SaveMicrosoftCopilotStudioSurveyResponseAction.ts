import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SaveMicrosoftCopilotStudioSurveyResponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse {
  "@odata.context"?: string;
  ErrorResponse: string;
}

/**
 * Parameters of the msdyn_SaveMicrosoftCopilotStudioSurveyResponse action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveMicrosoftCopilotStudioSurveyResponseActionParameters {
  InputParams: string;
}

/**
 * msdyn_SaveMicrosoftCopilotStudioSurveyResponse action
 *
 * Unbound action
 */
export class msdyn_SaveMicrosoftCopilotStudioSurveyResponseAction implements Executable<msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse> {
  constructor(
    public readonly parameters: msdyn_SaveMicrosoftCopilotStudioSurveyResponseActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveMicrosoftCopilotStudioSurveyResponse`;

    const body = requestBody({
      InputParams: this.parameters.InputParams,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse;
  }
}
