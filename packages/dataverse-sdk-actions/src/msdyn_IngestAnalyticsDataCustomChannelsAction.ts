import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IngestAnalyticsDataCustomChannels action
 */
export interface msdyn_IngestAnalyticsDataCustomChannelsResponse {
  // No content returned
}

/**
 * msdyn_IngestAnalyticsDataCustomChannels action
 *
 * Unbound action
 */
export class msdyn_IngestAnalyticsDataCustomChannelsAction implements Executable<msdyn_IngestAnalyticsDataCustomChannelsResponse> {
  constructor(
    public readonly msdyn_linkedactivityid: string,
    public readonly msdyn_eventname: string,
    public readonly msdyn_sequencestepid: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IngestAnalyticsDataCustomChannels`;

    const body: Record<string, unknown> = {
      msdyn_linkedactivityid: this.msdyn_linkedactivityid,
      msdyn_eventname: this.msdyn_eventname,
      msdyn_sequencestepid: this.msdyn_sequencestepid,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_IngestAnalyticsDataCustomChannelsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
