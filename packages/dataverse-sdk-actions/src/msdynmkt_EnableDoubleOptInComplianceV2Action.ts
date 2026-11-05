import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_EnableDoubleOptInComplianceV2 action
 */
export interface msdynmkt_EnableDoubleOptInComplianceV2Response {
  // No content returned
}

/**
 * msdynmkt_EnableDoubleOptInComplianceV2 action
 *
 * Unbound action
 */
export class msdynmkt_EnableDoubleOptInComplianceV2Action implements Executable<msdynmkt_EnableDoubleOptInComplianceV2Response> {
  constructor(public readonly msdynmkt_complianceid: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_EnableDoubleOptInComplianceV2`;

    const body: Record<string, unknown> = {
      msdynmkt_complianceid: this.msdynmkt_complianceid,
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

  async parseResponse(response: Response): Promise<msdynmkt_EnableDoubleOptInComplianceV2Response> {
    // No return value (204 No Content)
    return {};
  }
}
