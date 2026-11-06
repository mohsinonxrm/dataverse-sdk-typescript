import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse as msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncRequestParameters {
  SurveyStatus?: string;
  InputParams: string;
}

/**
 * msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync request message
 *
 * Web API Action: msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync
 */
export class msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse>
{
  declare readonly Parameters: Readonly<msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncRequestParameters>;

  constructor(parameters: msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncRequestParameters) {
    super("msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync`;

    const body = requestBody({
      SurveyStatus: this.Parameters.SurveyStatus,
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
  ): Promise<msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse.fromResponse({});
    return msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync response message
 */
export class msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponseData) {
    super("msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync");
  }

  static fromResponse(data: unknown): msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse {
    return new msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse(
      responseObject<msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponseData>(data)
    );
  }
}
