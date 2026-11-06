import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from _ServiceCalendarAction action
 */
export interface _ServiceCalendarActionResponse {
  OutputParameter: string;
}

/**
 * Parameters of the _ServiceCalendarAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _ServiceCalendarActionActionParameters {
  Type: number;
  InputParameter?: string;
}

/**
 * _ServiceCalendarAction action
 *
 * Unbound action
 */
export class _ServiceCalendarActionAction implements Executable<_ServiceCalendarActionResponse> {
  constructor(public readonly parameters: _ServiceCalendarActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_ServiceCalendarAction`;

    const body = requestBody({
      Type: this.parameters.Type,
      InputParameter: this.parameters.InputParameter,
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

  async parseResponse(response: Response): Promise<_ServiceCalendarActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as _ServiceCalendarActionResponse;
  }
}
