import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the _ServiceCalendarAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _ServiceCalendarActionRequestParameters {
  Type: number;
  InputParameter?: string;
}

/**
 * _ServiceCalendarAction request message
 *
 * Web API Action: _ServiceCalendarAction
 */
export class _ServiceCalendarActionRequest
  extends OrganizationRequest
  implements Executable<_ServiceCalendarActionResponse>
{
  declare readonly Parameters: Readonly<_ServiceCalendarActionRequestParameters>;

  constructor(parameters: _ServiceCalendarActionRequestParameters) {
    super("_ServiceCalendarAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_ServiceCalendarAction`;

    const body = requestBody({
      Type: this.Parameters.Type,
      InputParameter: this.Parameters.InputParameter,
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
    return _ServiceCalendarActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the _ServiceCalendarAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _ServiceCalendarActionResult {
  "@odata.context"?: string;
  OutputParameter: string;
}

/**
 * _ServiceCalendarAction response message
 *
 * `result` is the value the _ServiceCalendarAction action returns (see {@link _ServiceCalendarActionResult}).
 */
export class _ServiceCalendarActionResponse extends OrganizationResponse {
  constructor(public result: _ServiceCalendarActionResult) {
    super("_ServiceCalendarAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): _ServiceCalendarActionResponse {
    return new _ServiceCalendarActionResponse(data as _ServiceCalendarActionResult);
  }
}
