import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { _ServiceCalendarActionResponse as _ServiceCalendarActionResponseData } from "./types/index.js";

/**
 * _ServiceCalendarAction request message
 *
 * Web API Action: _ServiceCalendarAction
 */
export class _ServiceCalendarActionRequest
  extends OrganizationRequest
  implements Executable<_ServiceCalendarActionResponse>
{
  constructor(
    public type: number,
    public inputParameter: string
  ) {
    super("_ServiceCalendarAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_ServiceCalendarAction`;

    const body: Record<string, unknown> = {
      Type: this.type,
      InputParameter: this.inputParameter,
    };

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
    const data = await response.json();
    return _ServiceCalendarActionResponse.fromResponse(data);
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
