import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the SendTemplate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendTemplateRequestParameters {
  TemplateId: string;
  Sender: EntityReference | AnyEntityPayload;
  Recipients: Record<string, unknown>[];
  Regarding: EntityReference | AnyEntityPayload;
  DeliveryPriorityCode?: number;
}

/**
 * SendTemplate request message
 *
 * Web API Action: SendTemplate
 */
export class SendTemplateRequest
  extends OrganizationRequest
  implements Executable<SendTemplateResponse>
{
  declare readonly Parameters: Readonly<SendTemplateRequestParameters>;

  constructor(parameters: SendTemplateRequestParameters) {
    super("SendTemplate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendTemplate`;

    const body = requestBody({
      TemplateId: this.Parameters.TemplateId,
      Sender: this.Parameters.Sender,
      Recipients: this.Parameters.Recipients,
      Regarding: this.Parameters.Regarding,
      DeliveryPriorityCode: this.Parameters.DeliveryPriorityCode,
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
