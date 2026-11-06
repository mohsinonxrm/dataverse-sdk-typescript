import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_normalizecontactpointResponse as msdynmkt_normalizecontactpointResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_normalizecontactpoint message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_normalizecontactpointRequestParameters {
  msdynmkt_contactpointvalue: string;
  msdynmkt_contactpointtype: number;
}

/**
 * msdynmkt_normalizecontactpoint request message
 *
 * Web API Action: msdynmkt_normalizecontactpoint
 */
export class msdynmkt_normalizecontactpointRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_normalizecontactpointResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_normalizecontactpointRequestParameters>;

  constructor(parameters: msdynmkt_normalizecontactpointRequestParameters) {
    super("msdynmkt_normalizecontactpoint", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_normalizecontactpoint`;

    const body = requestBody({
      msdynmkt_contactpointvalue: this.Parameters.msdynmkt_contactpointvalue,
      msdynmkt_contactpointtype: this.Parameters.msdynmkt_contactpointtype,
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

  async parseResponse(response: Response): Promise<msdynmkt_normalizecontactpointResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdynmkt_normalizecontactpointResponse.fromResponse({});
    return msdynmkt_normalizecontactpointResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_normalizecontactpoint response message
 */
export class msdynmkt_normalizecontactpointResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_normalizecontactpointResponseData) {
    super("msdynmkt_normalizecontactpoint");
  }

  static fromResponse(data: unknown): msdynmkt_normalizecontactpointResponse {
    return new msdynmkt_normalizecontactpointResponse(
      responseObject<msdynmkt_normalizecontactpointResponseData>(data)
    );
  }
}
