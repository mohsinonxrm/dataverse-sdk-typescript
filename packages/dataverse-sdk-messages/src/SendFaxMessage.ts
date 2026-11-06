import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the SendFax message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendFaxRequestParameters {
  FaxId: string;
  IssueSend: boolean;
}

/**
 * SendFax request message
 *
 * Web API Action: SendFax
 */
export class SendFaxRequest extends OrganizationRequest implements Executable<SendFaxResponse> {
  declare readonly Parameters: Readonly<SendFaxRequestParameters>;

  constructor(parameters: SendFaxRequestParameters) {
    super("SendFax", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendFax`;

    const body = requestBody({
      FaxId: this.Parameters.FaxId,
      IssueSend: this.Parameters.IssueSend,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<SendFaxResponse> {
    // No return value (204 No Content)
    return new SendFaxResponse();
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
