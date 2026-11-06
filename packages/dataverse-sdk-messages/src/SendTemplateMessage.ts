import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * SendTemplate request message
 *
 * Web API Action: SendTemplate
 */
export class SendTemplateRequest
  extends OrganizationRequest
  implements Executable<SendTemplateResponse>
{
  constructor(
    public templateId: string,
    public sender: EntityReference,
    public recipients: Record<string, unknown>[],
    public regarding: EntityReference,
    public deliveryPriorityCode: number
  ) {
    super("SendTemplate");
  }

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
    return new SendTemplateResponse();
  }
}

/**
 * SendTemplate response message
 */
export class SendTemplateResponse extends OrganizationResponse {
  constructor() {
    super("SendTemplate");
  }

  static fromResponse(_data: unknown): SendTemplateResponse {
    return new SendTemplateResponse();
  }
}
