import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_consentsubmissionResponse as msdynmkt_consentsubmissionResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_consentsubmission message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_consentsubmissionRequestParameters {
  msdynmkt_preferencecenterid?: string;
  msdynmkt_consentversion?: string;
  msdynmkt_purposeconsents: string;
  msdynmkt_trackingcontextid?: string;
  msdynmkt_contactpointtype: number;
  msdynmkt_contactpointvalue: string;
  msdynmkt_topicconsents?: string;
}

/**
 * msdynmkt_consentsubmission request message
 *
 * Web API Action: msdynmkt_consentsubmission
 */
export class msdynmkt_consentsubmissionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_consentsubmissionResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_consentsubmissionRequestParameters>;

  constructor(parameters: msdynmkt_consentsubmissionRequestParameters) {
    super("msdynmkt_consentsubmission", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_consentsubmission`;

    const body = requestBody({
      msdynmkt_preferencecenterid: this.Parameters.msdynmkt_preferencecenterid,
      msdynmkt_consentversion: this.Parameters.msdynmkt_consentversion,
      msdynmkt_purposeconsents: this.Parameters.msdynmkt_purposeconsents,
      msdynmkt_trackingcontextid: this.Parameters.msdynmkt_trackingcontextid,
      msdynmkt_contactpointtype: this.Parameters.msdynmkt_contactpointtype,
      msdynmkt_contactpointvalue: this.Parameters.msdynmkt_contactpointvalue,
      msdynmkt_topicconsents: this.Parameters.msdynmkt_topicconsents,
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

  async parseResponse(response: Response): Promise<msdynmkt_consentsubmissionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdynmkt_consentsubmissionResponse.fromResponse({});
    return msdynmkt_consentsubmissionResponse.fromResponse(await response.json());
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
