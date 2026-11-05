import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_checkconsentbatch request message
 *
 * Web API Action: msdynmkt_checkconsentbatch
 */
export class msdynmkt_checkconsentbatchRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_checkconsentbatchResponse>
{
  constructor(
    public msdynmkt_owningbusinessunitid: string,
    public msdynmkt_channeltype: string,
    public msdynmkt_contactpoints: string[],
    public msdynmkt_compliancesettingsid: string,
    public msdynmkt_topicid: string,
    public msdynmkt_purposeid: string
  ) {
    super("msdynmkt_checkconsentbatch");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_checkconsentbatch`;

    const body: Record<string, unknown> = {
      msdynmkt_owningbusinessunitid: this.msdynmkt_owningbusinessunitid,
      msdynmkt_channeltype: this.msdynmkt_channeltype,
      msdynmkt_contactpoints: this.msdynmkt_contactpoints,
      msdynmkt_compliancesettingsid: this.msdynmkt_compliancesettingsid,
      msdynmkt_topicid: this.msdynmkt_topicid,
      msdynmkt_purposeid: this.msdynmkt_purposeid,
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

  async parseResponse(response: Response): Promise<msdynmkt_checkconsentbatchResponse> {
    const data = await response.json();
    return msdynmkt_checkconsentbatchResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdynmkt_owningbusinessunitid: this.msdynmkt_owningbusinessunitid,
      msdynmkt_channeltype: this.msdynmkt_channeltype,
      msdynmkt_contactpoints: this.msdynmkt_contactpoints,
      msdynmkt_compliancesettingsid: this.msdynmkt_compliancesettingsid,
      msdynmkt_topicid: this.msdynmkt_topicid,
      msdynmkt_purposeid: this.msdynmkt_purposeid,
    };
  }
}

/**
 * msdynmkt_checkconsentbatch response message
 */
export class msdynmkt_checkconsentbatchResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_checkconsentbatchResponse) {
    super("msdynmkt_checkconsentbatch");
  }

  static fromResponse(data: unknown): msdynmkt_checkconsentbatchResponse {
    return new msdynmkt_checkconsentbatchResponse((data as any).value);
  }
}
