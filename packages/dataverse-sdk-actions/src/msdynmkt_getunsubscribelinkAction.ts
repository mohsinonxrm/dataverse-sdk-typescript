import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_getunsubscribelink action
 */
export interface msdynmkt_getunsubscribelinkResponse {
  msdynmkt_errormessage: string;
  msdynmkt_issuccess: boolean;
  msdynmkt_unsubscribelink: string;
  msdynmkt_companyaddress: string;
}

/**
 * msdynmkt_getunsubscribelink action
 *
 * Unbound action
 */
export class msdynmkt_getunsubscribelinkAction implements Executable<msdynmkt_getunsubscribelinkResponse> {
  constructor(
    public readonly msdynmkt_purposeid: string,
    public readonly msdynmkt_sourcemessageentityname: string,
    public readonly msdynmkt_messagetemplateid: string,
    public readonly msdynmkt_owningbusinessunitid: string,
    public readonly msdynmkt_entitytype: string,
    public readonly msdynmkt_entityid: string,
    public readonly msdynmkt_contactpoint: string,
    public readonly msdynmkt_oneclickunsubscribelink: boolean,
    public readonly msdynmkt_compliancesettingsid: string,
    public readonly msdynmkt_topicid: string,
    public readonly msdynmkt_sourceapplication: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_getunsubscribelinkResponse> {
    const data = await response.json();
    return data as msdynmkt_getunsubscribelinkResponse;
  }
}
