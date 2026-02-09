import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_ListWidgetDataCustomAction action
 */
export interface msdynmkt_ListWidgetDataCustomActionResponse {
  WidgetDefinition: string;
  WidgetData: string;
  IsSuccess: boolean;
  StatusCode: number;
  ErrorMessage: string;
}

/**
 * msdynmkt_ListWidgetDataCustomAction action
 *
 * Unbound action
 */
export class msdynmkt_ListWidgetDataCustomActionAction implements Executable<msdynmkt_ListWidgetDataCustomActionResponse> {
  constructor(public readonly widgetRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ListWidgetDataCustomAction`;

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

  async parseResponse(response: Response): Promise<msdynmkt_ListWidgetDataCustomActionResponse> {
    const data = await response.json();
    return data as msdynmkt_ListWidgetDataCustomActionResponse;
  }
}
