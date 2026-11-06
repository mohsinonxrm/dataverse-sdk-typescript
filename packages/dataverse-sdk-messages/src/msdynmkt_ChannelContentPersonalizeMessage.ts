import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_ChannelContentPersonalize message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_ChannelContentPersonalizeRequestParameters {
  msdynmkt_PersonalizeContentRequest: string;
}

/**
 * msdynmkt_ChannelContentPersonalize request message
 *
 * Web API Action: msdynmkt_ChannelContentPersonalize
 */
export class msdynmkt_ChannelContentPersonalizeRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_ChannelContentPersonalizeResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_ChannelContentPersonalizeRequestParameters>;

  constructor(parameters: msdynmkt_ChannelContentPersonalizeRequestParameters) {
    super("msdynmkt_ChannelContentPersonalize", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ChannelContentPersonalize`;

    const body = requestBody({
      msdynmkt_PersonalizeContentRequest: this.Parameters.msdynmkt_PersonalizeContentRequest,
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
    return msdynmkt_ChannelContentPersonalizeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_ChannelContentPersonalize action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_ChannelContentPersonalizeResult {
  "@odata.context"?: string;
  msdynmkt_PersonalizeContentResponse: string;
}

/**
 * msdynmkt_ChannelContentPersonalize response message
 *
 * `result` is the value the msdynmkt_ChannelContentPersonalize action returns (see {@link msdynmkt_ChannelContentPersonalizeResult}).
 */
export class msdynmkt_ChannelContentPersonalizeResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ChannelContentPersonalizeResult) {
    super("msdynmkt_ChannelContentPersonalize");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_ChannelContentPersonalizeResponse {
    return new msdynmkt_ChannelContentPersonalizeResponse(
      data as msdynmkt_ChannelContentPersonalizeResult
    );
  }
}
