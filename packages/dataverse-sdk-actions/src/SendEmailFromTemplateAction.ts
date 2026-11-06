import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { email } from "./types/index.js";

/**
 * Response from SendEmailFromTemplate action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface SendEmailFromTemplateResponse extends email {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * SendEmailFromTemplate action
 *
 * Unbound action
 */
export class SendEmailFromTemplateAction implements Executable<SendEmailFromTemplateResponse> {
  constructor(
    public readonly templateId: string,
    public readonly regarding: EntityReference,
    public readonly target: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendEmailFromTemplate`;

    const body: Record<string, unknown> = {
      TemplateId: this.templateId,
      Regarding: this.regarding,
      Target: this.target,
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

  async parseResponse(response: Response): Promise<SendEmailFromTemplateResponse> {
    const data = await response.json();
    return data as SendEmailFromTemplateResponse;
  }
}
