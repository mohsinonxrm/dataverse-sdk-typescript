import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from SendFax action
 */
export interface SendFaxResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<SendFaxResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SendFaxResponse;
    return (await response.json()) as SendFaxResponse;
  }
}
