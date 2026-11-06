import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_updategdprconfigurationResponse as msdynmkt_updategdprconfigurationResponseData } from "./types/index.js";

/**
 * msdynmkt_updategdprconfiguration request message
 *
 * Web API Action: msdynmkt_updategdprconfiguration
 */
export class msdynmkt_updategdprconfigurationRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_updategdprconfigurationResponse>
{
  constructor(
    public msdynmkt_updategdprconfigurationisenforced: boolean,
    public msdynmkt_updategdprconfigurationischangeloggingenabled: boolean
  ) {
    super("msdynmkt_updategdprconfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_updategdprconfiguration`;

    const body: Record<string, unknown> = {
      msdynmkt_updategdprconfigurationisenforced: this.msdynmkt_updategdprconfigurationisenforced,
      msdynmkt_updategdprconfigurationischangeloggingenabled:
        this.msdynmkt_updategdprconfigurationischangeloggingenabled,
    };

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
    const data = await response.json();
    return msdynmkt_updategdprconfigurationResponse.fromResponse(data);
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
