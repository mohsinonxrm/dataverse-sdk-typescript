import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_checkconsentbatchResponse as msdynmkt_checkconsentbatchResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_checkconsentbatch message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_checkconsentbatchRequestParameters {
  msdynmkt_owningbusinessunitid?: string;
  msdynmkt_channeltype: string;
  msdynmkt_contactpoints: string[];
  msdynmkt_compliancesettingsid: string;
  msdynmkt_topicid?: string;
  msdynmkt_purposeid: string;
}

/**
 * msdynmkt_checkconsentbatch request message
 *
 * Web API Action: msdynmkt_checkconsentbatch
 */
export class msdynmkt_checkconsentbatchRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_checkconsentbatchResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_checkconsentbatchRequestParameters>;

  constructor(parameters: msdynmkt_checkconsentbatchRequestParameters) {
    super("msdynmkt_checkconsentbatch", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_checkconsentbatch`;

    const body = requestBody({
      msdynmkt_owningbusinessunitid: this.Parameters.msdynmkt_owningbusinessunitid,
      msdynmkt_channeltype: this.Parameters.msdynmkt_channeltype,
      msdynmkt_contactpoints: this.Parameters.msdynmkt_contactpoints,
      msdynmkt_compliancesettingsid: this.Parameters.msdynmkt_compliancesettingsid,
      msdynmkt_topicid: this.Parameters.msdynmkt_topicid,
      msdynmkt_purposeid: this.Parameters.msdynmkt_purposeid,
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

  async parseResponse(response: Response): Promise<msdynmkt_checkconsentbatchResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdynmkt_checkconsentbatchResponse.fromResponse({});
    return msdynmkt_checkconsentbatchResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_checkconsentbatch response message
 */
export class msdynmkt_checkconsentbatchResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_checkconsentbatchResponseData) {
    super("msdynmkt_checkconsentbatch");
  }

  static fromResponse(data: unknown): msdynmkt_checkconsentbatchResponse {
    return new msdynmkt_checkconsentbatchResponse(
      responseObject<msdynmkt_checkconsentbatchResponseData>(data)
    );
  }
}
