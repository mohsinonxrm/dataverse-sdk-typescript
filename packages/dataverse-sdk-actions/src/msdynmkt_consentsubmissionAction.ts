import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_consentsubmission action
 */
export interface msdynmkt_consentsubmissionResponse {
  msdynmkt_consentsubmissionresponse: string;
}

/**
 * Parameters of the msdynmkt_consentsubmission action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_consentsubmissionActionParameters {
  msdynmkt_preferencecenterid?: string;
  msdynmkt_consentversion?: string;
  msdynmkt_purposeconsents: string;
  msdynmkt_trackingcontextid?: string;
  msdynmkt_contactpointtype: number;
  msdynmkt_contactpointvalue: string;
  msdynmkt_topicconsents?: string;
}

/**
 * msdynmkt_consentsubmission action
 *
 * Unbound action
 */
export class msdynmkt_consentsubmissionAction implements Executable<msdynmkt_consentsubmissionResponse> {
  constructor(public readonly parameters: msdynmkt_consentsubmissionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_consentsubmission`;

    const body = requestBody({
      msdynmkt_preferencecenterid: this.parameters.msdynmkt_preferencecenterid,
      msdynmkt_consentversion: this.parameters.msdynmkt_consentversion,
      msdynmkt_purposeconsents: this.parameters.msdynmkt_purposeconsents,
      msdynmkt_trackingcontextid: this.parameters.msdynmkt_trackingcontextid,
      msdynmkt_contactpointtype: this.parameters.msdynmkt_contactpointtype,
      msdynmkt_contactpointvalue: this.parameters.msdynmkt_contactpointvalue,
      msdynmkt_topicconsents: this.parameters.msdynmkt_topicconsents,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_consentsubmissionResponse;
  }
}
