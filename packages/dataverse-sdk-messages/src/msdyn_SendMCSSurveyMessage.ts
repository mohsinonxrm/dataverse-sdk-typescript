import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_SendMCSSurvey request message
 *
 * Web API Action: msdyn_SendMCSSurvey
 */
export class msdyn_SendMCSSurveyRequest
  extends OrganizationRequest
  implements Executable<msdyn_SendMCSSurveyResponse>
{
  constructor(
    public from: EntityReference,
    public to: Record<string, unknown>[],
    public cc: Record<string, unknown>[],
    public bcc: Record<string, unknown>[],
    public regarding: EntityReference,
    public template: EntityReference
  ) {
    super("msdyn_SendMCSSurvey");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SendMCSSurveyResponse> {
    // No return value (204 No Content)
    return new msdyn_SendMCSSurveyResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      From: this.from,
      To: this.to,
      Cc: this.cc,
      Bcc: this.bcc,
      Regarding: this.regarding,
      Template: this.template,
    };
  }
}

/**
 * msdyn_SendMCSSurvey response message
 */
export class msdyn_SendMCSSurveyResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SendMCSSurvey");
  }

  static fromResponse(_data: unknown): msdyn_SendMCSSurveyResponse {
    return new msdyn_SendMCSSurveyResponse();
  }
}
