import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AlmHandler action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AlmHandlerResponse {
  "@odata.context"?: string;
  result: string;
}

/**
 * Parameters of the AlmHandler action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AlmHandlerActionParameters {
  action: string;
  input?: string;
}

/**
 * AlmHandler action
 *
 * Unbound action
 */
export class AlmHandlerAction implements Executable<AlmHandlerResponse> {
  constructor(public readonly parameters: AlmHandlerActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AlmHandler`;

    const body = requestBody({
      action: this.parameters.action,
      input: this.parameters.input,
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

  async parseResponse(response: Response): Promise<AlmHandlerResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as AlmHandlerResponse;
  }
}
