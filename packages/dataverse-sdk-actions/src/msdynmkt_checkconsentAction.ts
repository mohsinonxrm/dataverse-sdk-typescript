import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_checkconsent action
 */
export interface msdynmkt_checkconsentResponse {
  msdynmkt_isconsentgiven: boolean;
  msdynmkt_errormessage: string;
  msdynmkt_issuccess: boolean;
  msdynmkt_reason: string;
}

/**
 * msdynmkt_checkconsent action
 *
 * Unbound action
 */
export class msdynmkt_checkconsentAction implements Executable<msdynmkt_checkconsentResponse> {
  constructor(
    public readonly msdynmkt_contactpoint: string,
    public readonly msdynmkt_owningbusinessunitid: string,
    public readonly msdynmkt_purposeid: string,
    public readonly msdynmkt_compliancesettingsid: string,
    public readonly msdynmkt_topicid: string,
    public readonly msdynmkt_channeltype: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_checkconsentResponse> {
    const data = await response.json();
    return data as msdynmkt_checkconsentResponse;
  }
}
