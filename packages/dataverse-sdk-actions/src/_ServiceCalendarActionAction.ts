import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from _ServiceCalendarAction action
 */
export interface _ServiceCalendarActionResponse {
  OutputParameter: string;
}

/**
 * _ServiceCalendarAction action
 *
 * Unbound action
 */
export class _ServiceCalendarActionAction implements Executable<_ServiceCalendarActionResponse> {
  constructor(
    public readonly type: number,
    public readonly inputParameter: string
  ) {}

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
    return data as _ServiceCalendarActionResponse;
  }
}
