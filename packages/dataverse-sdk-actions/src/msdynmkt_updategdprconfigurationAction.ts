import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_updategdprconfiguration action
 */
export interface msdynmkt_updategdprconfigurationResponse {
  msdynmkt_updategdprconfigurationresponse: string;
}

/**
 * Parameters of the msdynmkt_updategdprconfiguration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_updategdprconfigurationActionParameters {
  msdynmkt_updategdprconfigurationisenforced: boolean;
  msdynmkt_updategdprconfigurationischangeloggingenabled: boolean;
}

/**
 * msdynmkt_updategdprconfiguration action
 *
 * Unbound action
 */
export class msdynmkt_updategdprconfigurationAction implements Executable<msdynmkt_updategdprconfigurationResponse> {
  constructor(public readonly parameters: msdynmkt_updategdprconfigurationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_updategdprconfiguration`;

    const body = requestBody({
      msdynmkt_updategdprconfigurationisenforced:
        this.parameters.msdynmkt_updategdprconfigurationisenforced,
      msdynmkt_updategdprconfigurationischangeloggingenabled:
        this.parameters.msdynmkt_updategdprconfigurationischangeloggingenabled,
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

  async parseResponse(response: Response): Promise<msdynmkt_updategdprconfigurationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_updategdprconfigurationResponse;
  }
}
