import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_ValueWidgetDataCustomActionResponse as msdynmkt_ValueWidgetDataCustomActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_ValueWidgetDataCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_ValueWidgetDataCustomActionRequestParameters {
  WidgetRequest?: string;
}

/**
 * msdynmkt_ValueWidgetDataCustomAction request message
 *
 * Web API Action: msdynmkt_ValueWidgetDataCustomAction
 */
export class msdynmkt_ValueWidgetDataCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_ValueWidgetDataCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_ValueWidgetDataCustomActionRequestParameters>;

  constructor(parameters: msdynmkt_ValueWidgetDataCustomActionRequestParameters = {}) {
    super("msdynmkt_ValueWidgetDataCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ValueWidgetDataCustomAction`;

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

  async parseResponse(response: Response): Promise<msdynmkt_ValueWidgetDataCustomActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_ValueWidgetDataCustomActionResponse.fromResponse({});
    return msdynmkt_ValueWidgetDataCustomActionResponse.fromResponse(await response.json());
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
