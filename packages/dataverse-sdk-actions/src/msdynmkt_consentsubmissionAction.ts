import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_consentsubmission action
 */
export interface msdynmkt_consentsubmissionResponse {
  msdynmkt_consentsubmissionresponse: string;
}

/**
 * msdynmkt_consentsubmission action
 *
 * Unbound action
 */
export class msdynmkt_consentsubmissionAction implements Executable<msdynmkt_consentsubmissionResponse> {
  constructor(
    public readonly msdynmkt_preferencecenterid: string,
    public readonly msdynmkt_consentversion: string,
    public readonly msdynmkt_purposeconsents: string,
    public readonly msdynmkt_trackingcontextid: string,
    public readonly msdynmkt_contactpointtype: number,
    public readonly msdynmkt_contactpointvalue: string,
    public readonly msdynmkt_topicconsents: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_consentsubmission`;

    const body: Record<string, unknown> = {
      msdynmkt_preferencecenterid: this.msdynmkt_preferencecenterid,
      msdynmkt_consentversion: this.msdynmkt_consentversion,
      msdynmkt_purposeconsents: this.msdynmkt_purposeconsents,
      msdynmkt_trackingcontextid: this.msdynmkt_trackingcontextid,
      msdynmkt_contactpointtype: this.msdynmkt_contactpointtype,
      msdynmkt_contactpointvalue: this.msdynmkt_contactpointvalue,
      msdynmkt_topicconsents: this.msdynmkt_topicconsents,
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

  async parseResponse(response: Response): Promise<msdynmkt_consentsubmissionResponse> {
    const data = await response.json();
    return data as msdynmkt_consentsubmissionResponse;
  }
}
