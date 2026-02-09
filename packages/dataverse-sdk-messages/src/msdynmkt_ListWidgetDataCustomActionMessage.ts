import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_ListWidgetDataCustomAction request message
 *
 * Web API Action: msdynmkt_ListWidgetDataCustomAction
 */
export class msdynmkt_ListWidgetDataCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_ListWidgetDataCustomActionResponse>
{
  constructor(public widgetRequest: string) {
    super("msdynmkt_ListWidgetDataCustomAction");
  }

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
    return msdynmkt_ListWidgetDataCustomActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      WidgetRequest: this.widgetRequest,
    };
  }
}

/**
 * msdynmkt_ListWidgetDataCustomAction response message
 */
export class msdynmkt_ListWidgetDataCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ListWidgetDataCustomActionResponse) {
    super("msdynmkt_ListWidgetDataCustomAction");
  }

  static fromResponse(data: unknown): msdynmkt_ListWidgetDataCustomActionResponse {
    return new msdynmkt_ListWidgetDataCustomActionResponse((data as any).value);
  }
}
