import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_ChannelContentPersonalize action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_ChannelContentPersonalizeResponse {
  "@odata.context"?: string;
  msdynmkt_PersonalizeContentResponse: string;
}

/**
 * Parameters of the msdynmkt_ChannelContentPersonalize action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_ChannelContentPersonalizeActionParameters {
  msdynmkt_PersonalizeContentRequest: string;
}

/**
 * msdynmkt_ChannelContentPersonalize action
 *
 * Unbound action
 */
export class msdynmkt_ChannelContentPersonalizeAction implements Executable<msdynmkt_ChannelContentPersonalizeResponse> {
  constructor(public readonly parameters: msdynmkt_ChannelContentPersonalizeActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ChannelContentPersonalize`;

    const body = requestBody({
      msdynmkt_PersonalizeContentRequest: this.parameters.msdynmkt_PersonalizeContentRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_ChannelContentPersonalizeResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_ChannelContentPersonalizeResponse;
  }
}
