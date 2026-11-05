import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_checkconsentResponse as msdynmkt_checkconsentResponseData } from "./types/index.js";

/**
 * msdynmkt_checkconsent request message
 *
 * Web API Action: msdynmkt_checkconsent
 */
export class msdynmkt_checkconsentRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_checkconsentResponse>
{
  constructor(
    public msdynmkt_contactpoint: string,
    public msdynmkt_owningbusinessunitid: string,
    public msdynmkt_purposeid: string,
    public msdynmkt_compliancesettingsid: string,
    public msdynmkt_topicid: string,
    public msdynmkt_channeltype: string
  ) {
    super("msdynmkt_checkconsent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_checkconsent`;

    const body: Record<string, unknown> = {
      msdynmkt_contactpoint: this.msdynmkt_contactpoint,
      msdynmkt_owningbusinessunitid: this.msdynmkt_owningbusinessunitid,
      msdynmkt_purposeid: this.msdynmkt_purposeid,
      msdynmkt_compliancesettingsid: this.msdynmkt_compliancesettingsid,
      msdynmkt_topicid: this.msdynmkt_topicid,
      msdynmkt_channeltype: this.msdynmkt_channeltype,
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

  async parseResponse(response: Response): Promise<msdynmkt_checkconsentResponse> {
    const data = await response.json();
    return msdynmkt_checkconsentResponse.fromResponse(data);
  }
}

/**
 * msdynmkt_checkconsent response message
 */
export class msdynmkt_checkconsentResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_checkconsentResponseData) {
    super("msdynmkt_checkconsent");
  }

  static fromResponse(data: unknown): msdynmkt_checkconsentResponse {
    return new msdynmkt_checkconsentResponse(
      responseObject<msdynmkt_checkconsentResponseData>(data)
    );
  }
}
