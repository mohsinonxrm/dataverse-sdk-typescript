import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { email } from "./types/index.js";

/**
 * Parameters of the SendEmailFromTemplate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendEmailFromTemplateRequestParameters {
  TemplateId: string;
  Regarding: EntityReference | AnyEntityPayload;
  Target: EntityReference | AnyEntityPayload;
}

/**
 * SendEmailFromTemplate request message
 *
 * Web API Action: SendEmailFromTemplate
 */
export class SendEmailFromTemplateRequest
  extends OrganizationRequest
  implements Executable<SendEmailFromTemplateResponse>
{
  declare readonly Parameters: Readonly<SendEmailFromTemplateRequestParameters>;

  constructor(parameters: SendEmailFromTemplateRequestParameters) {
    super("SendEmailFromTemplate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendEmailFromTemplate`;

    const body = requestBody({
      TemplateId: this.Parameters.TemplateId,
      Regarding: this.Parameters.Regarding,
      Target: this.Parameters.Target,
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

  async parseResponse(response: Response): Promise<SendEmailFromTemplateResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return SendEmailFromTemplateResponse.fromResponse(text ? JSON.parse(text) : {});
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
