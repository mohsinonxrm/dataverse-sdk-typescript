import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_SendEmailFromTemplate request message
 *
 * Web API Action: msdyn_SendEmailFromTemplate
 */
export class msdyn_SendEmailFromTemplateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SendEmailFromTemplateResponse>
{
  constructor(
    public from: EntityReference,
    public to: Record<string, unknown>[],
    public cc: Record<string, unknown>[],
    public bcc: Record<string, unknown>[],
    public regarding: EntityReference,
    public template: EntityReference
  ) {
    super("msdyn_SendEmailFromTemplate");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendEmailFromTemplate`;

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

  async parseResponse(response: Response): Promise<msdyn_SendEmailFromTemplateResponse> {
    // No return value (204 No Content)
    return new msdyn_SendEmailFromTemplateResponse();
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
 * msdyn_SendEmailFromTemplate response message
 */
export class msdyn_SendEmailFromTemplateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SendEmailFromTemplate");
  }

  static fromResponse(_data: unknown): msdyn_SendEmailFromTemplateResponse {
    return new msdyn_SendEmailFromTemplateResponse();
  }
}
