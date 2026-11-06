import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_SendEmailFromTemplate action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_SendEmailFromTemplateResponse = void;

/**
 * Parameters of the msdyn_SendEmailFromTemplate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SendEmailFromTemplateActionParameters {
  From: EntityReference | AnyEntityPayload;
  To: Record<string, unknown>[];
  Cc?: Record<string, unknown>[];
  Bcc?: Record<string, unknown>[];
  Regarding: EntityReference | AnyEntityPayload;
  Template: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SendEmailFromTemplate action
 *
 * Unbound action
 */
export class msdyn_SendEmailFromTemplateAction implements Executable<msdyn_SendEmailFromTemplateResponse> {
  constructor(public readonly parameters: msdyn_SendEmailFromTemplateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendEmailFromTemplate`;

    const body = requestBody({
      From: this.parameters.From,
      To: this.parameters.To,
      Cc: this.parameters.Cc,
      Bcc: this.parameters.Bcc,
      Regarding: this.parameters.Regarding,
      Template: this.parameters.Template,
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

  parseResponse(_response: Response): Promise<msdyn_SendEmailFromTemplateResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
