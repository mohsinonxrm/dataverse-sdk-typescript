import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SaveMicrosoftCopilotStudioSurveyResponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SaveMicrosoftCopilotStudioSurveyResponseResult {
  "@odata.context"?: string;
  ErrorResponse: string;
}

/**
 * msdyn_SaveMicrosoftCopilotStudioSurveyResponse response message
 *
 * `result` is the value the msdyn_SaveMicrosoftCopilotStudioSurveyResponse action returns (see {@link msdyn_SaveMicrosoftCopilotStudioSurveyResponseResult}).
 */
export class msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveMicrosoftCopilotStudioSurveyResponseResult) {
    super("msdyn_SaveMicrosoftCopilotStudioSurveyResponse");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse {
    return new msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse(
      data as msdyn_SaveMicrosoftCopilotStudioSurveyResponseResult
    );
  }
}
