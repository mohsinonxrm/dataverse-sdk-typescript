import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_ValueWidgetDataCustomActionResponse as msdynmkt_ValueWidgetDataCustomActionResponseData } from "./types/index.js";

/**
 * msdynmkt_ValueWidgetDataCustomAction request message
 *
 * Web API Action: msdynmkt_ValueWidgetDataCustomAction
 */
export class msdynmkt_ValueWidgetDataCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_ValueWidgetDataCustomActionResponse>
{
  constructor(public widgetRequest: string) {
    super("msdynmkt_ValueWidgetDataCustomAction");
  }

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
    return msdynmkt_ValueWidgetDataCustomActionResponse.fromResponse(data);
  }
}

/**
 * msdynmkt_ValueWidgetDataCustomAction response message
 */
export class msdynmkt_ValueWidgetDataCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ValueWidgetDataCustomActionResponseData) {
    super("msdynmkt_ValueWidgetDataCustomAction");
  }

  static fromResponse(data: unknown): msdynmkt_ValueWidgetDataCustomActionResponse {
    return new msdynmkt_ValueWidgetDataCustomActionResponse(
      responseObject<msdynmkt_ValueWidgetDataCustomActionResponseData>(data)
    );
  }
}
