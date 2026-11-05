import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateSurveyJson action
 */
export interface msdyn_UpdateSurveyJsonResponse {
  // No content returned
}

/**
 * msdyn_UpdateSurveyJson action
 *
 * Unbound action
 */
export class msdyn_UpdateSurveyJsonAction implements Executable<msdyn_UpdateSurveyJsonResponse> {
  constructor(
    public readonly inspectionDefinitionId: string,
    public readonly newInspectionJson: string
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_UpdateSurveyJsonResponse> {
    // No return value (204 No Content)
    return {};
  }
}
