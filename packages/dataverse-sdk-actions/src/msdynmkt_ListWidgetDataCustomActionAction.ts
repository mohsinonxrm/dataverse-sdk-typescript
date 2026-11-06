import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_ListWidgetDataCustomAction action
 */
export interface msdynmkt_ListWidgetDataCustomActionResponse {
  ErrorMessage: string;
  IsSuccess: boolean;
  StatusCode: number;
  WidgetData: string;
  WidgetDefinition: string;
}

/**
 * Parameters of the msdynmkt_ListWidgetDataCustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_ListWidgetDataCustomActionActionParameters {
  WidgetRequest?: string;
}

/**
 * msdynmkt_ListWidgetDataCustomAction action
 *
 * Unbound action
 */
export class msdynmkt_ListWidgetDataCustomActionAction implements Executable<msdynmkt_ListWidgetDataCustomActionResponse> {
  constructor(
    public readonly parameters: msdynmkt_ListWidgetDataCustomActionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ListWidgetDataCustomAction`;

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

  async parseResponse(response: Response): Promise<msdynmkt_ListWidgetDataCustomActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_ListWidgetDataCustomActionResponse;
    return (await response.json()) as msdynmkt_ListWidgetDataCustomActionResponse;
  }
}
