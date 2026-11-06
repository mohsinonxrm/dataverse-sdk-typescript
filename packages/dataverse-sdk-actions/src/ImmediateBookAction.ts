import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { BusinessNotification, ValidationResult } from "./types/index.js";

/**
 * Response from ImmediateBook action
 */
export interface ImmediateBookResponse {
  ValidationResult: ValidationResult;
  Notifications: BusinessNotification[];
}

/**
 * Parameters of the ImmediateBook action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImmediateBookActionParameters {
  Target: EntityReference | AnyEntityPayload;
  AttachmentIds?: string[];
  EWSUrl?: string;
  AttachmentToken?: string;
}

/**
 * ImmediateBook action
 *
 * Unbound action
 */
export class ImmediateBookAction implements Executable<ImmediateBookResponse> {
  constructor(public readonly parameters: ImmediateBookActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImmediateBook`;

    const body = requestBody({
      Target: this.parameters.Target,
      AttachmentIds: this.parameters.AttachmentIds,
      EWSUrl: this.parameters.EWSUrl,
      AttachmentToken: this.parameters.AttachmentToken,
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

  async parseResponse(response: Response): Promise<ImmediateBookResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ImmediateBookResponse;
  }
}
