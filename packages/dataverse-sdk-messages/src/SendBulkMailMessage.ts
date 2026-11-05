import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { TypedQueryBase } from "./types/index.js";

/**
 * SendBulkMail request message
 *
 * Web API Action: SendBulkMail
 */
export class SendBulkMailRequest
  extends OrganizationRequest
  implements Executable<SendBulkMailResponse>
{
  constructor(
    public sender: EntityReference,
    public templateId: string,
    public regardingType: string,
    public regardingId: string,
    public query: TypedQueryBase
  ) {
    super("SendBulkMail");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendBulkMail`;

    const body: Record<string, unknown> = {
      Sender: this.sender,
      TemplateId: this.templateId,
      RegardingType: this.regardingType,
      RegardingId: this.regardingId,
      Query: this.query,
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

  async parseResponse(response: Response): Promise<SendBulkMailResponse> {
    // No return value (204 No Content)
    return new SendBulkMailResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Sender: this.sender,
      TemplateId: this.templateId,
      RegardingType: this.regardingType,
      RegardingId: this.regardingId,
      Query: this.query,
    };
  }
}

/**
 * SendBulkMail response message
 */
export class SendBulkMailResponse extends OrganizationResponse {
  constructor() {
    super("SendBulkMail");
  }

  static fromResponse(_data: unknown): SendBulkMailResponse {
    return new SendBulkMailResponse();
  }
}
