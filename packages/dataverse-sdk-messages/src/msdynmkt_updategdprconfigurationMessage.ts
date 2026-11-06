import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_updategdprconfigurationResponse as msdynmkt_updategdprconfigurationResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_updategdprconfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_updategdprconfigurationRequestParameters {
  msdynmkt_updategdprconfigurationisenforced: boolean;
  msdynmkt_updategdprconfigurationischangeloggingenabled: boolean;
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
      msdynmkt_updategdprconfigurationisenforced:
        this.Parameters.msdynmkt_updategdprconfigurationisenforced,
      msdynmkt_updategdprconfigurationischangeloggingenabled:
        this.Parameters.msdynmkt_updategdprconfigurationischangeloggingenabled,
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
    // 204 No Content is an empty result
    if (response.status === 204) return msdynmkt_updategdprconfigurationResponse.fromResponse({});
    return msdynmkt_updategdprconfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_updategdprconfiguration response message
 */
export class msdynmkt_updategdprconfigurationResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_updategdprconfigurationResponseData) {
    super("msdynmkt_updategdprconfiguration");
  }

  static fromResponse(data: unknown): msdynmkt_updategdprconfigurationResponse {
    return new msdynmkt_updategdprconfigurationResponse(
      responseObject<msdynmkt_updategdprconfigurationResponseData>(data)
    );
  }
}
