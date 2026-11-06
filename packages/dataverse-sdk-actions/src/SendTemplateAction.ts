import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from SendTemplate action
 */
export interface SendTemplateResponse {
  // No content returned
}

/**
 * SendTemplate action
 *
 * Unbound action
 */
export class SendTemplateAction implements Executable<SendTemplateResponse> {
  constructor(
    public readonly templateId: string,
    public readonly sender: EntityReference | AnyEntityPayload,
    public readonly recipients: Record<string, unknown>[],
    public readonly regarding: EntityReference | AnyEntityPayload,
    public readonly deliveryPriorityCode?: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendTemplate`;

    const body: Record<string, unknown> = {
      TemplateId: this.templateId,
      Sender: this.sender,
      Recipients: this.recipients,
      Regarding: this.regarding,
      DeliveryPriorityCode: this.deliveryPriorityCode,
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

  async parseResponse(response: Response): Promise<SendTemplateResponse> {
    // No return value (204 No Content)
    return {};
  }
}
