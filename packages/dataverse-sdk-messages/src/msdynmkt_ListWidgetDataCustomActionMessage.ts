import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_ListWidgetDataCustomActionResponse as msdynmkt_ListWidgetDataCustomActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_ListWidgetDataCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_ListWidgetDataCustomActionRequestParameters {
  WidgetRequest?: string;
}

/**
 * msdynmkt_ListWidgetDataCustomAction request message
 *
 * Web API Action: msdynmkt_ListWidgetDataCustomAction
 */
export class msdynmkt_ListWidgetDataCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_ListWidgetDataCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_ListWidgetDataCustomActionRequestParameters>;

  constructor(parameters: msdynmkt_ListWidgetDataCustomActionRequestParameters = {}) {
    super("msdynmkt_ListWidgetDataCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ListWidgetDataCustomAction`;

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

  async parseResponse(response: Response): Promise<msdynmkt_ListWidgetDataCustomActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_ListWidgetDataCustomActionResponse.fromResponse({});
    return msdynmkt_ListWidgetDataCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_ListWidgetDataCustomAction response message
 */
export class msdynmkt_ListWidgetDataCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ListWidgetDataCustomActionResponseData) {
    super("msdynmkt_ListWidgetDataCustomAction");
  }

  static fromResponse(data: unknown): msdynmkt_ListWidgetDataCustomActionResponse {
    return new msdynmkt_ListWidgetDataCustomActionResponse(
      responseObject<msdynmkt_ListWidgetDataCustomActionResponseData>(data)
    );
  }
}
