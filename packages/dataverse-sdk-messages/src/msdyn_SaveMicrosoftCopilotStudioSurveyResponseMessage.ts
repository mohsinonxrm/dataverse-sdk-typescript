import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse as msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SaveMicrosoftCopilotStudioSurveyResponse message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveMicrosoftCopilotStudioSurveyResponseRequestParameters {
  InputParams: string;
}

/**
 * msdyn_SaveMicrosoftCopilotStudioSurveyResponse request message
 *
 * Web API Action: msdyn_SaveMicrosoftCopilotStudioSurveyResponse
 */
export class msdyn_SaveMicrosoftCopilotStudioSurveyResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse>
{
  declare readonly Parameters: Readonly<msdyn_SaveMicrosoftCopilotStudioSurveyResponseRequestParameters>;

  constructor(parameters: msdyn_SaveMicrosoftCopilotStudioSurveyResponseRequestParameters) {
    super("msdyn_SaveMicrosoftCopilotStudioSurveyResponse", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveMicrosoftCopilotStudioSurveyResponse`;

    const body = requestBody({
      InputParams: this.Parameters.InputParams,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse.fromResponse({});
    return msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse.fromResponse(
      await response.json()
    );
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
