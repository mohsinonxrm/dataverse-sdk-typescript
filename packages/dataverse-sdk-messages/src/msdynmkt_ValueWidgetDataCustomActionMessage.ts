import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdynmkt_ValueWidgetDataCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_ValueWidgetDataCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_ValueWidgetDataCustomActionResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  StatusCode: number;
  WidgetData: string;
  WidgetDefinition: string;
}

/**
 * msdynmkt_ValueWidgetDataCustomAction response message
 *
 * `result` is the value the msdynmkt_ValueWidgetDataCustomAction action returns (see {@link msdynmkt_ValueWidgetDataCustomActionResult}).
 */
export class msdynmkt_ValueWidgetDataCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ValueWidgetDataCustomActionResult) {
    super("msdynmkt_ValueWidgetDataCustomAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_ValueWidgetDataCustomActionResponse {
    return new msdynmkt_ValueWidgetDataCustomActionResponse(
      data as msdynmkt_ValueWidgetDataCustomActionResult
    );
  }
}
