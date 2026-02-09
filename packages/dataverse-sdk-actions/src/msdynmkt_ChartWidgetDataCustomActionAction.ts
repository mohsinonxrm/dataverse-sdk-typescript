import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_ChartWidgetDataCustomAction action
 */
export interface msdynmkt_ChartWidgetDataCustomActionResponse {
  WidgetDefinition: string;
  WidgetData: string;
  IsSuccess: boolean;
  StatusCode: number;
  ErrorMessage: string;
}

/**
 * msdynmkt_ChartWidgetDataCustomAction action
 *
 * Unbound action
 */
export class msdynmkt_ChartWidgetDataCustomActionAction implements Executable<msdynmkt_ChartWidgetDataCustomActionResponse> {
  constructor(public readonly widgetRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ChartWidgetDataCustomAction`;

    const body: Record<string, unknown> = {
      WidgetRequest: this.widgetRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_ChartWidgetDataCustomActionResponse> {
    const data = await response.json();
    return data as msdynmkt_ChartWidgetDataCustomActionResponse;
  }
}
