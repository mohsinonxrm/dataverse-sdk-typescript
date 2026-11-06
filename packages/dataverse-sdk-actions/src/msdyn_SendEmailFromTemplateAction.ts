import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_SendEmailFromTemplate action
 */
export interface msdyn_SendEmailFromTemplateResponse {
  // No content returned
}

/**
 * msdyn_SendEmailFromTemplate action
 *
 * Unbound action
 */
export class msdyn_SendEmailFromTemplateAction implements Executable<msdyn_SendEmailFromTemplateResponse> {
  constructor(
    public readonly from: EntityReference | AnyEntityPayload,
    public readonly to: Record<string, unknown>[],
    public readonly cc: Record<string, unknown>[] | undefined,
    public readonly bcc: Record<string, unknown>[] | undefined,
    public readonly regarding: EntityReference | AnyEntityPayload,
    public readonly template: EntityReference | AnyEntityPayload
  ) {}

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
    return {};
  }
}
