import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse as msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponseData } from "./types/index.js";

/**
 * msdyn_SaveMicrosoftCopilotStudioSurveyResponse request message
 *
 * Web API Action: msdyn_SaveMicrosoftCopilotStudioSurveyResponse
 */
export class msdyn_SaveMicrosoftCopilotStudioSurveyResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse>
{
  constructor(public inputParams: string) {
    super("msdyn_SaveMicrosoftCopilotStudioSurveyResponse");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveMicrosoftCopilotStudioSurveyResponse`;

    const body: Record<string, unknown> = {
      InputParams: this.inputParams,
    };

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
    const data = await response.json();
    return msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse.fromResponse(data);
  }
}

/**
 * msdyn_SaveMicrosoftCopilotStudioSurveyResponse response message
 */
export class msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponseData) {
    super("msdyn_SaveMicrosoftCopilotStudioSurveyResponse");
  }

  static fromResponse(data: unknown): msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse {
    return new msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse(
      responseObject<msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponseData>(data)
    );
  }
}
