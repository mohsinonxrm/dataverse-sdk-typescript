import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_SendMCSSurvey action
 */
export interface msdyn_SendMCSSurveyResponse {
  // No content returned
}

/**
 * msdyn_SendMCSSurvey action
 *
 * Unbound action
 */
export class msdyn_SendMCSSurveyAction implements Executable<msdyn_SendMCSSurveyResponse> {
  constructor(
    public readonly from: EntityReference,
    public readonly to: Record<string, unknown>[],
    public readonly cc: Record<string, unknown>[],
    public readonly bcc: Record<string, unknown>[],
    public readonly regarding: EntityReference,
    public readonly template: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendMCSSurvey`;

    const body: Record<string, unknown> = {
      From: this.from,
      To: this.to,
      Cc: this.cc,
      Bcc: this.bcc,
      Regarding: this.regarding,
      Template: this.template,
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

  async parseResponse(response: Response): Promise<msdyn_SendMCSSurveyResponse> {
    // No return value (204 No Content)
    return {};
  }
}
