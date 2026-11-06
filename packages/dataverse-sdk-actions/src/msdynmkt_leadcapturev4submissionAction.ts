import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdynmkt_leadcapturev4submission action
 */
export interface msdynmkt_leadcapturev4submissionResponse {
  // No content returned
}

/**
 * Parameters of the msdynmkt_leadcapturev4submission action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_leadcapturev4submissionActionParameters {
  msdynmkt_consentversion?: string;
  msdynmkt_marketingformid: EntityReference | AnyEntityPayload;
  msdynmkt_formsubmissionid: EntityReference | AnyEntityPayload;
}

/**
 * msdynmkt_leadcapturev4submission action
 *
 * Unbound action
 */
export class msdynmkt_leadcapturev4submissionAction implements Executable<msdynmkt_leadcapturev4submissionResponse> {
  constructor(public readonly parameters: msdynmkt_leadcapturev4submissionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_leadcapturev4submission`;

    const body = requestBody({
      msdynmkt_consentversion: this.parameters.msdynmkt_consentversion,
      msdynmkt_marketingformid: this.parameters.msdynmkt_marketingformid,
      msdynmkt_formsubmissionid: this.parameters.msdynmkt_formsubmissionid,
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

  async parseResponse(response: Response): Promise<msdynmkt_leadcapturev4submissionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_leadcapturev4submissionResponse;
  }
}
