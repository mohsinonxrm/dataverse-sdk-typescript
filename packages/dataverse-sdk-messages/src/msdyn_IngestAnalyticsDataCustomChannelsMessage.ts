import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IngestAnalyticsDataCustomChannels request message
 *
 * Web API Action: msdyn_IngestAnalyticsDataCustomChannels
 */
export class msdyn_IngestAnalyticsDataCustomChannelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_IngestAnalyticsDataCustomChannelsResponse>
{
  constructor(
    public msdyn_linkedactivityid: string,
    public msdyn_eventname: string,
    public msdyn_sequencestepid: string
  ) {
    super("msdyn_IngestAnalyticsDataCustomChannels");
  }

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
    return new msdyn_IngestAnalyticsDataCustomChannelsResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_linkedactivityid: this.msdyn_linkedactivityid,
      msdyn_eventname: this.msdyn_eventname,
      msdyn_sequencestepid: this.msdyn_sequencestepid,
    };
  }
}

/**
 * msdyn_IngestAnalyticsDataCustomChannels response message
 */
export class msdyn_IngestAnalyticsDataCustomChannelsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_IngestAnalyticsDataCustomChannels");
  }

  static fromResponse(_data: unknown): msdyn_IngestAnalyticsDataCustomChannelsResponse {
    return new msdyn_IngestAnalyticsDataCustomChannelsResponse();
  }
}
