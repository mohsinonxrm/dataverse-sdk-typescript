import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_ChartWidgetDataCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_ChartWidgetDataCustomActionResponse {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  StatusCode: number;
  WidgetData: string;
  WidgetDefinition: string;
}

/**
 * Parameters of the msdynmkt_ChartWidgetDataCustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_ChartWidgetDataCustomActionActionParameters {
  WidgetRequest?: string;
}

/**
 * msdynmkt_ChartWidgetDataCustomAction action
 *
 * Unbound action
 */
export class msdynmkt_ChartWidgetDataCustomActionAction implements Executable<msdynmkt_ChartWidgetDataCustomActionResponse> {
  constructor(
    public readonly parameters: msdynmkt_ChartWidgetDataCustomActionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ChartWidgetDataCustomAction`;

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

  async parseResponse(response: Response): Promise<msdynmkt_ChartWidgetDataCustomActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_ChartWidgetDataCustomActionResponse;
  }
}
