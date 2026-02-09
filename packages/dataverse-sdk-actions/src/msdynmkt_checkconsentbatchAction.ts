import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_checkconsentbatch action
 */
export interface msdynmkt_checkconsentbatchResponse {
  msdynmkt_errormessage: string;
  msdynmkt_issuccess: boolean;
}

/**
 * msdynmkt_checkconsentbatch action
 *
 * Unbound action
 */
export class msdynmkt_checkconsentbatchAction implements Executable<msdynmkt_checkconsentbatchResponse> {
  constructor(
    public readonly msdynmkt_owningbusinessunitid: string,
    public readonly msdynmkt_channeltype: string,
    public readonly msdynmkt_contactpoints: string[],
    public readonly msdynmkt_compliancesettingsid: string,
    public readonly msdynmkt_topicid: string,
    public readonly msdynmkt_purposeid: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_checkconsentbatchResponse> {
    const data = await response.json();
    return data as msdynmkt_checkconsentbatchResponse;
  }
}
