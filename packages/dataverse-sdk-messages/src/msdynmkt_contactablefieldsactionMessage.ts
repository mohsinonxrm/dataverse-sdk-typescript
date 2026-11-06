import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_contactablefieldsactionResponse as msdynmkt_contactablefieldsactionResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_contactablefieldsaction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_contactablefieldsactionRequestParameters {
  msdynmkt_contactpointtypes: string;
  msdynmkt_entitytypes: string;
}

/**
 * msdynmkt_contactablefieldsaction request message
 *
 * Web API Action: msdynmkt_contactablefieldsaction
 */
export class msdynmkt_contactablefieldsactionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_contactablefieldsactionResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_contactablefieldsactionRequestParameters>;

  constructor(parameters: msdynmkt_contactablefieldsactionRequestParameters) {
    super("msdynmkt_contactablefieldsaction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_contactablefieldsaction`;

    const body = requestBody({
      msdynmkt_contactpointtypes: this.Parameters.msdynmkt_contactpointtypes,
      msdynmkt_entitytypes: this.Parameters.msdynmkt_entitytypes,
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

  async parseResponse(response: Response): Promise<msdynmkt_contactablefieldsactionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdynmkt_contactablefieldsactionResponse.fromResponse(text ? JSON.parse(text) : {});
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
