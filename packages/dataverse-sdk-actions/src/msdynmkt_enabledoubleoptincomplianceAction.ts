import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_enabledoubleoptincompliance action
 */
export interface msdynmkt_enabledoubleoptincomplianceResponse {
  // No content returned
}

/**
 * msdynmkt_enabledoubleoptincompliance action
 *
 * Unbound action
 */
export class msdynmkt_enabledoubleoptincomplianceAction implements Executable<msdynmkt_enabledoubleoptincomplianceResponse> {
  constructor(public readonly msdynmkt_complianceid: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_enabledoubleoptincompliance`;

    const body: Record<string, unknown> = {
      msdynmkt_complianceid: this.msdynmkt_complianceid,
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

  async parseResponse(response: Response): Promise<msdynmkt_enabledoubleoptincomplianceResponse> {
    // No return value (204 No Content)
    return {};
  }
}
