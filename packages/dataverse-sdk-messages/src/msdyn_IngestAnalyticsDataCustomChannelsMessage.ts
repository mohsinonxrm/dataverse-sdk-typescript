import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_IngestAnalyticsDataCustomChannels message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IngestAnalyticsDataCustomChannelsRequestParameters {
  msdyn_linkedactivityid?: string;
  msdyn_eventname: string;
  msdyn_sequencestepid?: string;
}

/**
 * msdyn_IngestAnalyticsDataCustomChannels request message
 *
 * Web API Action: msdyn_IngestAnalyticsDataCustomChannels
 */
export class msdyn_IngestAnalyticsDataCustomChannelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_IngestAnalyticsDataCustomChannelsResponse>
{
  declare readonly Parameters: Readonly<msdyn_IngestAnalyticsDataCustomChannelsRequestParameters>;

  constructor(parameters: msdyn_IngestAnalyticsDataCustomChannelsRequestParameters) {
    super("msdyn_IngestAnalyticsDataCustomChannels", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IngestAnalyticsDataCustomChannels`;

    const body = requestBody({
      msdyn_linkedactivityid: this.Parameters.msdyn_linkedactivityid,
      msdyn_eventname: this.Parameters.msdyn_eventname,
      msdyn_sequencestepid: this.Parameters.msdyn_sequencestepid,
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
    // No return value (204 No Content)
    return new msdyn_IngestAnalyticsDataCustomChannelsResponse();
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
