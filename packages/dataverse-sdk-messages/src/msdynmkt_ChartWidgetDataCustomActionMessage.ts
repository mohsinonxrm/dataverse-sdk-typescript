import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdynmkt_ChartWidgetDataCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_ChartWidgetDataCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_ChartWidgetDataCustomActionResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  StatusCode: number;
  WidgetData: string;
  WidgetDefinition: string;
}

/**
 * msdynmkt_ChartWidgetDataCustomAction response message
 *
 * `result` is the value the msdynmkt_ChartWidgetDataCustomAction action returns (see {@link msdynmkt_ChartWidgetDataCustomActionResult}).
 */
export class msdynmkt_ChartWidgetDataCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ChartWidgetDataCustomActionResult) {
    super("msdynmkt_ChartWidgetDataCustomAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_ChartWidgetDataCustomActionResponse {
    return new msdynmkt_ChartWidgetDataCustomActionResponse(
      data as msdynmkt_ChartWidgetDataCustomActionResult
    );
  }
}
