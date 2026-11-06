import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_SendEmailFromTemplate action
 */
export interface msdyn_SendEmailFromTemplateResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdyn_SendEmailFromTemplateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SendEmailFromTemplateResponse;
    return (await response.json()) as msdyn_SendEmailFromTemplateResponse;
  }
}
