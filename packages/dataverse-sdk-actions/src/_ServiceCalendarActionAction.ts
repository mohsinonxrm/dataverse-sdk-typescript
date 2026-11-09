import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the _ServiceCalendarAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _ServiceCalendarActionResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as _ServiceCalendarActionResponse;
  }
}
