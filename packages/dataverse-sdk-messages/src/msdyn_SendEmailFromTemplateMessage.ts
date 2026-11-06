import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_SendEmailFromTemplate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SendEmailFromTemplateRequestParameters {
  From: EntityReference | AnyEntityPayload;
  To: Record<string, unknown>[];
  Cc?: Record<string, unknown>[];
  Bcc?: Record<string, unknown>[];
  Regarding: EntityReference | AnyEntityPayload;
  Template: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SendEmailFromTemplate request message
 *
 * Web API Action: msdyn_SendEmailFromTemplate
 */
export class msdyn_SendEmailFromTemplateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SendEmailFromTemplateResponse>
{
  declare readonly Parameters: Readonly<msdyn_SendEmailFromTemplateRequestParameters>;

  constructor(parameters: msdyn_SendEmailFromTemplateRequestParameters) {
    super("msdyn_SendEmailFromTemplate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendEmailFromTemplate`;

    const body = requestBody({
      From: this.Parameters.From,
      To: this.Parameters.To,
      Cc: this.Parameters.Cc,
      Bcc: this.Parameters.Bcc,
      Regarding: this.Parameters.Regarding,
      Template: this.Parameters.Template,
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

  async parseResponse(response: Response): Promise<msdyn_SendEmailFromTemplateResponse> {
    // No return value (204 No Content)
    return new msdyn_SendEmailFromTemplateResponse();
  }
}

/**
 * msdyn_SendEmailFromTemplate response message
 */
export class msdyn_SendEmailFromTemplateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SendEmailFromTemplate");
  }

  static fromResponse(_data: unknown): msdyn_SendEmailFromTemplateResponse {
    return new msdyn_SendEmailFromTemplateResponse();
  }
}
