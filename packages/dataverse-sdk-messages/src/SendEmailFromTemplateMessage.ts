import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { email } from "./types/index.js";

/**
 * SendEmailFromTemplate request message
 *
 * Web API Action: SendEmailFromTemplate
 */
export class SendEmailFromTemplateRequest
  extends OrganizationRequest
  implements Executable<SendEmailFromTemplateResponse>
{
  constructor(
    public templateId: string,
    public regarding: EntityReference | AnyEntityPayload,
    public target: EntityReference | AnyEntityPayload
  ) {
    super("SendEmailFromTemplate");
  }

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
    return SendEmailFromTemplateResponse.fromResponse(data);
  }
}

/**
 * SendEmailFromTemplate response message
 */
export class SendEmailFromTemplateResponse extends OrganizationResponse {
  constructor(public result: email) {
    super("SendEmailFromTemplate");
  }

  static fromResponse(data: unknown): SendEmailFromTemplateResponse {
    return new SendEmailFromTemplateResponse(responseObject<email>(data));
  }
}
