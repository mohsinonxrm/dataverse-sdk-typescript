import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_ValueWidgetDataCustomAction action
 */
export interface msdynmkt_ValueWidgetDataCustomActionResponse {
  WidgetDefinition: string;
  WidgetData: string;
  IsSuccess: boolean;
  StatusCode: number;
  ErrorMessage: string;
}

/**
 * msdynmkt_ValueWidgetDataCustomAction action
 *
 * Unbound action
 */
export class msdynmkt_ValueWidgetDataCustomActionAction implements Executable<msdynmkt_ValueWidgetDataCustomActionResponse> {
  constructor(public readonly widgetRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ValueWidgetDataCustomAction`;

    const body: Record<string, unknown> = {
      WidgetRequest: this.widgetRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_ValueWidgetDataCustomActionResponse> {
    const data = await response.json();
    return data as msdynmkt_ValueWidgetDataCustomActionResponse;
  }
}
