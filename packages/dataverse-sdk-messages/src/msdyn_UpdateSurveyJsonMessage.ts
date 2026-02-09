import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateSurveyJson request message
 *
 * Web API Action: msdyn_UpdateSurveyJson
 */
export class msdyn_UpdateSurveyJsonRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateSurveyJsonResponse>
{
  constructor(
    public inspectionDefinitionId: string,
    public newInspectionJson: string
  ) {
    super("msdyn_UpdateSurveyJson");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSurveyJson`;

    const body: Record<string, unknown> = {
      inspectionDefinitionId: this.inspectionDefinitionId,
      newInspectionJson: this.newInspectionJson,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateSurveyJsonResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateSurveyJsonResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      inspectionDefinitionId: this.inspectionDefinitionId,
      newInspectionJson: this.newInspectionJson,
    };
  }
}

/**
 * msdyn_UpdateSurveyJson response message
 */
export class msdyn_UpdateSurveyJsonResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateSurveyJson");
  }

  static fromResponse(_data: unknown): msdyn_UpdateSurveyJsonResponse {
    return new msdyn_UpdateSurveyJsonResponse();
  }
}
