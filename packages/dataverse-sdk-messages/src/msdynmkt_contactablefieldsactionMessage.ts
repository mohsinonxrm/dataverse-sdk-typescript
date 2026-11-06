import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_contactablefieldsaction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_contactablefieldsactionRequestParameters {
  msdynmkt_entitytypes: string;
  msdynmkt_contactpointtypes: string;
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
      msdynmkt_entitytypes: this.Parameters.msdynmkt_entitytypes,
      msdynmkt_contactpointtypes: this.Parameters.msdynmkt_contactpointtypes,
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
    // The body is the complex value, with its @odata.context
    return msdynmkt_contactablefieldsactionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_contactablefieldsaction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_contactablefieldsactionResult {
  "@odata.context"?: string;
  msdynmkt_contactablefieldsresponse: string;
}

/**
 * msdynmkt_contactablefieldsaction response message
 *
 * `result` is the value the msdynmkt_contactablefieldsaction action returns (see {@link msdynmkt_contactablefieldsactionResult}).
 */
export class msdynmkt_contactablefieldsactionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_contactablefieldsactionResult) {
    super("msdynmkt_contactablefieldsaction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_contactablefieldsactionResponse {
    return new msdynmkt_contactablefieldsactionResponse(
      data as msdynmkt_contactablefieldsactionResult
    );
  }
}
