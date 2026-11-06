import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_IngestAnalyticsDataCustomChannels action
 */
export interface msdyn_IngestAnalyticsDataCustomChannelsResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_IngestAnalyticsDataCustomChannels action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IngestAnalyticsDataCustomChannelsActionParameters {
  msdyn_linkedactivityid?: string;
  msdyn_eventname: string;
  msdyn_sequencestepid?: string;
}

/**
 * msdyn_IngestAnalyticsDataCustomChannels action
 *
 * Unbound action
 */
export class msdyn_IngestAnalyticsDataCustomChannelsAction implements Executable<msdyn_IngestAnalyticsDataCustomChannelsResponse> {
  constructor(
    public readonly parameters: msdyn_IngestAnalyticsDataCustomChannelsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IngestAnalyticsDataCustomChannels`;

    const body = requestBody({
      msdyn_linkedactivityid: this.parameters.msdyn_linkedactivityid,
      msdyn_eventname: this.parameters.msdyn_eventname,
      msdyn_sequencestepid: this.parameters.msdyn_sequencestepid,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_IngestAnalyticsDataCustomChannelsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_IngestAnalyticsDataCustomChannelsResponse;
    return (await response.json()) as msdyn_IngestAnalyticsDataCustomChannelsResponse;
  }
}
