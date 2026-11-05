import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_getunsubscribelink request message
 *
 * Web API Action: msdynmkt_getunsubscribelink
 */
export class msdynmkt_getunsubscribelinkRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_getunsubscribelinkResponse>
{
  constructor(
    public msdynmkt_purposeid: string,
    public msdynmkt_sourcemessageentityname: string,
    public msdynmkt_messagetemplateid: string,
    public msdynmkt_owningbusinessunitid: string,
    public msdynmkt_entitytype: string,
    public msdynmkt_entityid: string,
    public msdynmkt_contactpoint: string,
    public msdynmkt_oneclickunsubscribelink: boolean,
    public msdynmkt_compliancesettingsid: string,
    public msdynmkt_topicid: string,
    public msdynmkt_sourceapplication: string
  ) {
    super("msdynmkt_getunsubscribelink");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getunsubscribelink`;

    const body: Record<string, unknown> = {
      msdynmkt_purposeid: this.msdynmkt_purposeid,
      msdynmkt_sourcemessageentityname: this.msdynmkt_sourcemessageentityname,
      msdynmkt_messagetemplateid: this.msdynmkt_messagetemplateid,
      msdynmkt_owningbusinessunitid: this.msdynmkt_owningbusinessunitid,
      msdynmkt_entitytype: this.msdynmkt_entitytype,
      msdynmkt_entityid: this.msdynmkt_entityid,
      msdynmkt_contactpoint: this.msdynmkt_contactpoint,
      msdynmkt_oneclickunsubscribelink: this.msdynmkt_oneclickunsubscribelink,
      msdynmkt_compliancesettingsid: this.msdynmkt_compliancesettingsid,
      msdynmkt_topicid: this.msdynmkt_topicid,
      msdynmkt_sourceapplication: this.msdynmkt_sourceapplication,
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

  async parseResponse(response: Response): Promise<msdynmkt_getunsubscribelinkResponse> {
    const data = await response.json();
    return msdynmkt_getunsubscribelinkResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdynmkt_purposeid: this.msdynmkt_purposeid,
      msdynmkt_sourcemessageentityname: this.msdynmkt_sourcemessageentityname,
      msdynmkt_messagetemplateid: this.msdynmkt_messagetemplateid,
      msdynmkt_owningbusinessunitid: this.msdynmkt_owningbusinessunitid,
      msdynmkt_entitytype: this.msdynmkt_entitytype,
      msdynmkt_entityid: this.msdynmkt_entityid,
      msdynmkt_contactpoint: this.msdynmkt_contactpoint,
      msdynmkt_oneclickunsubscribelink: this.msdynmkt_oneclickunsubscribelink,
      msdynmkt_compliancesettingsid: this.msdynmkt_compliancesettingsid,
      msdynmkt_topicid: this.msdynmkt_topicid,
      msdynmkt_sourceapplication: this.msdynmkt_sourceapplication,
    };
  }
}

/**
 * msdynmkt_getunsubscribelink response message
 */
export class msdynmkt_getunsubscribelinkResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_getunsubscribelinkResponse) {
    super("msdynmkt_getunsubscribelink");
  }

  static fromResponse(data: unknown): msdynmkt_getunsubscribelinkResponse {
    return new msdynmkt_getunsubscribelinkResponse((data as any).value);
  }
}
