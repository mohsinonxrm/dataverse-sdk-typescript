import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { email } from "./types/index.js";

/**
 * Response from SendEmailFromTemplate action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface SendEmailFromTemplateResponse extends email {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the SendEmailFromTemplate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendEmailFromTemplateActionParameters {
  TemplateId: string;
  Regarding: EntityReference | AnyEntityPayload;
  Target: EntityReference | AnyEntityPayload;
}

/**
 * SendEmailFromTemplate action
 *
 * Unbound action
 */
export class SendEmailFromTemplateAction implements Executable<SendEmailFromTemplateResponse> {
  constructor(public readonly parameters: SendEmailFromTemplateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendEmailFromTemplate`;

    const body = requestBody({
      TemplateId: this.parameters.TemplateId,
      Regarding: this.parameters.Regarding,
      Target: this.parameters.Target,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SendEmailFromTemplateResponse;
    return (await response.json()) as SendEmailFromTemplateResponse;
  }
}
