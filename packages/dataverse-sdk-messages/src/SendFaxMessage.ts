import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * SendFax request message
 *
 * Web API Action: SendFax
 */
export class SendFaxRequest extends OrganizationRequest implements Executable<SendFaxResponse> {
  constructor(
    public faxId: string,
    public issueSend: boolean
  ) {
    super("SendFax");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendFax`;

    const body: Record<string, unknown> = {
      FaxId: this.faxId,
      IssueSend: this.issueSend,
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

  async parseResponse(response: Response): Promise<SendFaxResponse> {
    // No return value (204 No Content)
    return new SendFaxResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      FaxId: this.faxId,
      IssueSend: this.issueSend,
    };
  }
}

/**
 * SendFax response message
 */
export class SendFaxResponse extends OrganizationResponse {
  constructor() {
    super("SendFax");
  }

  static fromResponse(_data: unknown): SendFaxResponse {
    return new SendFaxResponse();
  }
}
