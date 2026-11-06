import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from SendTemplate action
 */
export interface SendTemplateResponse {
  // No content returned
}

/**
 * Parameters of the SendTemplate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendTemplateActionParameters {
  TemplateId: string;
  Sender: EntityReference | AnyEntityPayload;
  Recipients: Record<string, unknown>[];
  Regarding: EntityReference | AnyEntityPayload;
  DeliveryPriorityCode?: number;
}

/**
 * SendTemplate action
 *
 * Unbound action
 */
export class SendTemplateAction implements Executable<SendTemplateResponse> {
  constructor(public readonly parameters: SendTemplateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendTemplate`;

    const body = requestBody({
      TemplateId: this.parameters.TemplateId,
      Sender: this.parameters.Sender,
      Recipients: this.parameters.Recipients,
      Regarding: this.parameters.Regarding,
      DeliveryPriorityCode: this.parameters.DeliveryPriorityCode,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SendTemplateResponse;
    return (await response.json()) as SendTemplateResponse;
  }
}
