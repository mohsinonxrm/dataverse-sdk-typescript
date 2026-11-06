import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_consentsubmissionResponse as msdynmkt_consentsubmissionResponseData } from "./types/index.js";

/**
 * msdynmkt_consentsubmission request message
 *
 * Web API Action: msdynmkt_consentsubmission
 */
export class msdynmkt_consentsubmissionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_consentsubmissionResponse>
{
  constructor(
    public msdynmkt_preferencecenterid: string | undefined,
    public msdynmkt_consentversion: string | undefined,
    public msdynmkt_purposeconsents: string,
    public msdynmkt_trackingcontextid: string | undefined,
    public msdynmkt_contactpointtype: number,
    public msdynmkt_contactpointvalue: string,
    public msdynmkt_topicconsents?: string
  ) {
    super("msdynmkt_consentsubmission");
  }

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
    return msdynmkt_consentsubmissionResponse.fromResponse(data);
  }
}

/**
 * msdynmkt_consentsubmission response message
 */
export class msdynmkt_consentsubmissionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_consentsubmissionResponseData) {
    super("msdynmkt_consentsubmission");
  }

  static fromResponse(data: unknown): msdynmkt_consentsubmissionResponse {
    return new msdynmkt_consentsubmissionResponse(
      responseObject<msdynmkt_consentsubmissionResponseData>(data)
    );
  }
}
