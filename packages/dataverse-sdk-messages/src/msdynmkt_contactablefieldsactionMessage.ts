import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_contactablefieldsactionResponse as msdynmkt_contactablefieldsactionResponseData } from "./types/index.js";

/**
 * msdynmkt_contactablefieldsaction request message
 *
 * Web API Action: msdynmkt_contactablefieldsaction
 */
export class msdynmkt_contactablefieldsactionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_contactablefieldsactionResponse>
{
  constructor(
    public msdynmkt_contactpointtypes: string,
    public msdynmkt_entitytypes: string
  ) {
    super("msdynmkt_contactablefieldsaction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_contactablefieldsaction`;

    const body: Record<string, unknown> = {
      msdynmkt_contactpointtypes: this.msdynmkt_contactpointtypes,
      msdynmkt_entitytypes: this.msdynmkt_entitytypes,
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

  async parseResponse(response: Response): Promise<msdynmkt_contactablefieldsactionResponse> {
    const data = await response.json();
    return msdynmkt_contactablefieldsactionResponse.fromResponse(data);
  }
}

/**
 * msdynmkt_contactablefieldsaction response message
 */
export class msdynmkt_contactablefieldsactionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_contactablefieldsactionResponseData) {
    super("msdynmkt_contactablefieldsaction");
  }

  static fromResponse(data: unknown): msdynmkt_contactablefieldsactionResponse {
    return new msdynmkt_contactablefieldsactionResponse(
      responseObject<msdynmkt_contactablefieldsactionResponseData>(data)
    );
  }
}
