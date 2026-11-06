import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_updategdprconfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_updategdprconfigurationRequestParameters {
  msdynmkt_updategdprconfigurationischangeloggingenabled: boolean;
  msdynmkt_updategdprconfigurationisenforced: boolean;
}

/**
 * msdynmkt_updategdprconfiguration request message
 *
 * Web API Action: msdynmkt_updategdprconfiguration
 */
export class msdynmkt_updategdprconfigurationRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_updategdprconfigurationResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_updategdprconfigurationRequestParameters>;

  constructor(parameters: msdynmkt_updategdprconfigurationRequestParameters) {
    super("msdynmkt_updategdprconfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_updategdprconfiguration`;

    const body = requestBody({
      msdynmkt_updategdprconfigurationischangeloggingenabled:
        this.Parameters.msdynmkt_updategdprconfigurationischangeloggingenabled,
      msdynmkt_updategdprconfigurationisenforced:
        this.Parameters.msdynmkt_updategdprconfigurationisenforced,
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
    return msdynmkt_updategdprconfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_updategdprconfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_updategdprconfigurationResult {
  "@odata.context"?: string;
  msdynmkt_updategdprconfigurationresponse: string;
}

/**
 * msdynmkt_updategdprconfiguration response message
 *
 * `result` is the value the msdynmkt_updategdprconfiguration action returns (see {@link msdynmkt_updategdprconfigurationResult}).
 */
export class msdynmkt_updategdprconfigurationResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_updategdprconfigurationResult) {
    super("msdynmkt_updategdprconfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_updategdprconfigurationResponse {
    return new msdynmkt_updategdprconfigurationResponse(
      data as msdynmkt_updategdprconfigurationResult
    );
  }
}
