import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { TypedQueryBase } from "./types/index.js";

/**
 * Parameters of the SendBulkMail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendBulkMailRequestParameters {
  Sender: EntityReference | AnyEntityPayload;
  TemplateId: string;
  RegardingType: string;
  RegardingId: string;
  Query?: TypedQueryBase;
}

/**
 * SendBulkMail request message
 *
 * Web API Action: SendBulkMail
 */
export class SendBulkMailRequest
  extends OrganizationRequest
  implements Executable<SendBulkMailResponse>
{
  declare readonly Parameters: Readonly<SendBulkMailRequestParameters>;

  constructor(parameters: SendBulkMailRequestParameters) {
    super("SendBulkMail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendBulkMail`;

    const body = requestBody({
      Sender: this.Parameters.Sender,
      TemplateId: this.Parameters.TemplateId,
      RegardingType: this.Parameters.RegardingType,
      RegardingId: this.Parameters.RegardingId,
      Query: enumBody(this.Parameters.Query, "QueryBase"),
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

  parseResponse(_response: Response): Promise<SendBulkMailResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new SendBulkMailResponse());
  }
}

/**
 * SendBulkMail response message
 */
export class SendBulkMailResponse extends OrganizationResponse {
  constructor() {
    super("SendBulkMail");
  }

  static fromResponse(_data?: unknown): SendBulkMailResponse {
    return new SendBulkMailResponse();
  }
}
