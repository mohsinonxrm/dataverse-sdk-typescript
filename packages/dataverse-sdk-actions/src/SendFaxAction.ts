import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the SendFax action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type SendFaxResponse = void;

/**
 * Parameters of the SendFax action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendFaxActionParameters {
  FaxId: string;
  IssueSend: boolean;
}

/**
 * SendFax action
 *
 * Unbound action
 */
export class SendFaxAction implements Executable<SendFaxResponse> {
  constructor(public readonly parameters: SendFaxActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendFax`;

    const body = requestBody({
      FaxId: this.parameters.FaxId,
      IssueSend: this.parameters.IssueSend,
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

  parseResponse(_response: Response): Promise<SendFaxResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
