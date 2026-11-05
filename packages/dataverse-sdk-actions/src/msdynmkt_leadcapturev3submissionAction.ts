import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdynmkt_leadcapturev3submission action
 */
export interface msdynmkt_leadcapturev3submissionResponse {
  // No content returned
}

/**
 * msdynmkt_leadcapturev3submission action
 *
 * Unbound action
 */
export class msdynmkt_leadcapturev3submissionAction implements Executable<msdynmkt_leadcapturev3submissionResponse> {
  constructor(
    public readonly msdynmkt_formsubmissionid: EntityReference,
    public readonly msdynmkt_consentversion: string,
    public readonly msdynmkt_marketingformid: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_leadcapturev3submission`;

    const body: Record<string, unknown> = {
      msdynmkt_formsubmissionid: this.msdynmkt_formsubmissionid,
      msdynmkt_consentversion: this.msdynmkt_consentversion,
      msdynmkt_marketingformid: this.msdynmkt_marketingformid,
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

  async parseResponse(response: Response): Promise<msdynmkt_leadcapturev3submissionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
