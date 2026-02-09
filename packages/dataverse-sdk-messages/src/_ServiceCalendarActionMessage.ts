import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<_ServiceCalendarActionResponse> {
    const data = await response.json();
    return _ServiceCalendarActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Type: this.type,
      InputParameter: this.inputParameter,
    };
  }
}

/**
 * _ServiceCalendarAction response message
 */
export class _ServiceCalendarActionResponse extends OrganizationResponse {
  constructor(public result: _ServiceCalendarActionResponse) {
    super("_ServiceCalendarAction");
  }

  static fromResponse(data: unknown): _ServiceCalendarActionResponse {
    return new _ServiceCalendarActionResponse((data as any).value);
  }
}
