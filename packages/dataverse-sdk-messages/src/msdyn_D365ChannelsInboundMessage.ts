import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_D365ChannelsInbound message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_D365ChannelsInboundRequestParameters {
  inboundPayLoad: string;
}

/**
 * msdyn_D365ChannelsInbound request message
 *
 * Web API Action: msdyn_D365ChannelsInbound
 */
export class msdyn_D365ChannelsInboundRequest
  extends OrganizationRequest
  implements Executable<msdyn_D365ChannelsInboundResponse>
{
  declare readonly Parameters: Readonly<msdyn_D365ChannelsInboundRequestParameters>;

  constructor(parameters: msdyn_D365ChannelsInboundRequestParameters) {
    super("msdyn_D365ChannelsInbound", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_D365ChannelsInbound`;

    const body = requestBody({
      inboundPayLoad: this.Parameters.inboundPayLoad,
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

  async parseResponse(response: Response): Promise<msdyn_D365ChannelsInboundResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_D365ChannelsInboundResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_D365ChannelsInbound action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_D365ChannelsInboundResult {
  "@odata.context"?: string;
  responseMessage: string;
}

/**
 * msdyn_D365ChannelsInbound response message
 *
 * `result` is the value the msdyn_D365ChannelsInbound action returns (see {@link msdyn_D365ChannelsInboundResult}).
 */
export class msdyn_D365ChannelsInboundResponse extends OrganizationResponse {
  constructor(public result: msdyn_D365ChannelsInboundResult) {
    super("msdyn_D365ChannelsInbound");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_D365ChannelsInboundResponse {
    return new msdyn_D365ChannelsInboundResponse(data as msdyn_D365ChannelsInboundResult);
  }
}
