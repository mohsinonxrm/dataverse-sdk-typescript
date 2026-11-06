import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_updategdprconfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_updategdprconfigurationResponse {
  "@odata.context"?: string;
  msdynmkt_updategdprconfigurationresponse: string;
}

/**
 * Parameters of the msdynmkt_updategdprconfiguration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_updategdprconfigurationActionParameters {
  msdynmkt_updategdprconfigurationischangeloggingenabled: boolean;
  msdynmkt_updategdprconfigurationisenforced: boolean;
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
      msdynmkt_updategdprconfigurationischangeloggingenabled:
        this.parameters.msdynmkt_updategdprconfigurationischangeloggingenabled,
      msdynmkt_updategdprconfigurationisenforced:
        this.parameters.msdynmkt_updategdprconfigurationisenforced,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_updategdprconfigurationResponse;
  }
}
