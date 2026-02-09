import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdynmkt_leadcapturev4submission action
 */
export interface msdynmkt_leadcapturev4submissionResponse {
  // No content returned
}

/**
 * msdynmkt_leadcapturev4submission action
 *
 * Unbound action
 */
export class msdynmkt_leadcapturev4submissionAction implements Executable<msdynmkt_leadcapturev4submissionResponse> {
  constructor(
    public readonly msdynmkt_consentversion: string,
    public readonly msdynmkt_marketingformid: EntityReference,
    public readonly msdynmkt_formsubmissionid: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_leadcapturev4submission`;

    const body: Record<string, unknown> = {
      msdynmkt_consentversion: this.msdynmkt_consentversion,
      msdynmkt_marketingformid: this.msdynmkt_marketingformid,
      msdynmkt_formsubmissionid: this.msdynmkt_formsubmissionid,
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

  async parseResponse(response: Response): Promise<msdynmkt_leadcapturev4submissionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
