import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse {
  "@odata.context"?: string;
  ErrorResponse: string;
  SurveyResponseRecordId: string;
}

/**
 * Parameters of the msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncActionParameters {
  SurveyStatus?: string;
  InputParams: string;
}

/**
 * msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync action
 *
 * Unbound action
 */
export class msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncAction implements Executable<msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse> {
  constructor(
    public readonly parameters: msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync`;

    const body = requestBody({
      SurveyStatus: this.parameters.SurveyStatus,
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
  ): Promise<msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse;
  }
}
