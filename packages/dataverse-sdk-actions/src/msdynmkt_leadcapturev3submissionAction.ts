import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdynmkt_leadcapturev3submission action
 */
export interface msdynmkt_leadcapturev3submissionResponse {
  // No content returned
}

/**
 * Parameters of the msdynmkt_leadcapturev3submission action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_leadcapturev3submissionActionParameters {
  msdynmkt_formsubmissionid: EntityReference | AnyEntityPayload;
  msdynmkt_consentversion?: string;
  msdynmkt_marketingformid: EntityReference | AnyEntityPayload;
}

/**
 * msdynmkt_leadcapturev3submission action
 *
 * Unbound action
 */
export class msdynmkt_leadcapturev3submissionAction implements Executable<msdynmkt_leadcapturev3submissionResponse> {
  constructor(public readonly parameters: msdynmkt_leadcapturev3submissionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_leadcapturev3submission`;

    const body = requestBody({
      msdynmkt_formsubmissionid: this.parameters.msdynmkt_formsubmissionid,
      msdynmkt_consentversion: this.parameters.msdynmkt_consentversion,
      msdynmkt_marketingformid: this.parameters.msdynmkt_marketingformid,
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

  async parseResponse(response: Response): Promise<msdynmkt_leadcapturev3submissionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_leadcapturev3submissionResponse;
    return (await response.json()) as msdynmkt_leadcapturev3submissionResponse;
  }
}
