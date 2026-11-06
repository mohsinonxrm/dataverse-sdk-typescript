import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { _ServiceCalendarActionResponse as _ServiceCalendarActionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return _ServiceCalendarActionResponse.fromResponse({});
    return _ServiceCalendarActionResponse.fromResponse(await response.json());
  }
}

/**
 * _ServiceCalendarAction response message
 */
export class _ServiceCalendarActionResponse extends OrganizationResponse {
  constructor(public result: _ServiceCalendarActionResponseData) {
    super("_ServiceCalendarAction");
  }

  static fromResponse(data: unknown): _ServiceCalendarActionResponse {
    return new _ServiceCalendarActionResponse(
      responseObject<_ServiceCalendarActionResponseData>(data)
    );
  }
}
