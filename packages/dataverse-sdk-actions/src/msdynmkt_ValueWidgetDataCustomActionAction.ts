import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_ValueWidgetDataCustomAction action
 */
export interface msdynmkt_ValueWidgetDataCustomActionResponse {
  WidgetDefinition: string;
  WidgetData: string;
  IsSuccess: boolean;
  StatusCode: number;
  ErrorMessage: string;
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_ValueWidgetDataCustomActionResponse;
    return (await response.json()) as msdynmkt_ValueWidgetDataCustomActionResponse;
  }
}
