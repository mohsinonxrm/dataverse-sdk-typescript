import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_ChartWidgetDataCustomAction request message
 *
 * Web API Action: msdynmkt_ChartWidgetDataCustomAction
 */
export class msdynmkt_ChartWidgetDataCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_ChartWidgetDataCustomActionResponse>
{
  constructor(public widgetRequest: string) {
    super("msdynmkt_ChartWidgetDataCustomAction");
  }

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
    return msdynmkt_ChartWidgetDataCustomActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      WidgetRequest: this.widgetRequest,
    };
  }
}

/**
 * msdynmkt_ChartWidgetDataCustomAction response message
 */
export class msdynmkt_ChartWidgetDataCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ChartWidgetDataCustomActionResponse) {
    super("msdynmkt_ChartWidgetDataCustomAction");
  }

  static fromResponse(data: unknown): msdynmkt_ChartWidgetDataCustomActionResponse {
    return new msdynmkt_ChartWidgetDataCustomActionResponse((data as any).value);
  }
}
