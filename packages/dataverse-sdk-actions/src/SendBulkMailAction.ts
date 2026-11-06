import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { TypedQueryBase } from "./types/index.js";

/**
 * Response from the SendBulkMail action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type SendBulkMailResponse = void;

/**
 * Parameters of the SendBulkMail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendBulkMailActionParameters {
  Sender: EntityReference | AnyEntityPayload;
  TemplateId: string;
  RegardingType: string;
  RegardingId: string;
  Query?: TypedQueryBase;
}

/**
 * SendBulkMail action
 *
 * Unbound action
 */
export class SendBulkMailAction implements Executable<SendBulkMailResponse> {
  constructor(public readonly parameters: SendBulkMailActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendBulkMail`;

    const body = requestBody({
      Sender: this.parameters.Sender,
      TemplateId: this.parameters.TemplateId,
      RegardingType: this.parameters.RegardingType,
      RegardingId: this.parameters.RegardingId,
      Query: enumBody(this.parameters.Query, "QueryBase"),
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
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
