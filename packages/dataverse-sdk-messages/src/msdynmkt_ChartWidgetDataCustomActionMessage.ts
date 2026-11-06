import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_ChartWidgetDataCustomActionResponse as msdynmkt_ChartWidgetDataCustomActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_ChartWidgetDataCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_ChartWidgetDataCustomActionRequestParameters {
  WidgetRequest?: string;
}

/**
 * msdynmkt_ChartWidgetDataCustomAction request message
 *
 * Web API Action: msdynmkt_ChartWidgetDataCustomAction
 */
export class msdynmkt_ChartWidgetDataCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_ChartWidgetDataCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_ChartWidgetDataCustomActionRequestParameters>;

  constructor(parameters: msdynmkt_ChartWidgetDataCustomActionRequestParameters = {}) {
    super("msdynmkt_ChartWidgetDataCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ChartWidgetDataCustomAction`;

    const body = requestBody({
      WidgetRequest: this.Parameters.WidgetRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_ChartWidgetDataCustomActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdynmkt_ChartWidgetDataCustomActionResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdynmkt_ChartWidgetDataCustomAction response message
 */
export class msdynmkt_ChartWidgetDataCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ChartWidgetDataCustomActionResponseData) {
    super("msdynmkt_ChartWidgetDataCustomAction");
  }

  static fromResponse(data: unknown): msdynmkt_ChartWidgetDataCustomActionResponse {
    return new msdynmkt_ChartWidgetDataCustomActionResponse(
      responseObject<msdynmkt_ChartWidgetDataCustomActionResponseData>(data)
    );
  }
}
