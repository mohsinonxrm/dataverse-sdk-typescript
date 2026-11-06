import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_ValueWidgetDataCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_ValueWidgetDataCustomActionResponse {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  StatusCode: number;
  WidgetData: string;
  WidgetDefinition: string;
}

/**
 * Parameters of the msdynmkt_ValueWidgetDataCustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_ValueWidgetDataCustomActionActionParameters {
  WidgetRequest?: string;
}

/**
 * msdynmkt_ValueWidgetDataCustomAction action
 *
 * Unbound action
 */
export class msdynmkt_ValueWidgetDataCustomActionAction implements Executable<msdynmkt_ValueWidgetDataCustomActionResponse> {
  constructor(
    public readonly parameters: msdynmkt_ValueWidgetDataCustomActionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ValueWidgetDataCustomAction`;

    const body = requestBody({
      WidgetRequest: this.parameters.WidgetRequest,
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
    return (await response.json()) as msdynmkt_ValueWidgetDataCustomActionResponse;
  }
}
