import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdynmkt_ListWidgetDataCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_ListWidgetDataCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_ListWidgetDataCustomActionResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  StatusCode: number;
  WidgetData: string;
  WidgetDefinition: string;
}

/**
 * msdynmkt_ListWidgetDataCustomAction response message
 *
 * `result` is the value the msdynmkt_ListWidgetDataCustomAction action returns (see {@link msdynmkt_ListWidgetDataCustomActionResult}).
 */
export class msdynmkt_ListWidgetDataCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ListWidgetDataCustomActionResult) {
    super("msdynmkt_ListWidgetDataCustomAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_ListWidgetDataCustomActionResponse {
    return new msdynmkt_ListWidgetDataCustomActionResponse(
      data as msdynmkt_ListWidgetDataCustomActionResult
    );
  }
}
