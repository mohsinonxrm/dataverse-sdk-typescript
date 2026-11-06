import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResult {
  "@odata.context"?: string;
  ErrorResponse: string;
  SurveyResponseRecordId: string;
}

/**
 * msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync response message
 *
 * `result` is the value the msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync action returns (see {@link msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResult}).
 */
export class msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResult) {
    super("msdyn_SaveMicrosoftCopilotStudioSurveyResponseSync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse {
    return new msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResponse(
      data as msdyn_SaveMicrosoftCopilotStudioSurveyResponseSyncResult
    );
  }
}
