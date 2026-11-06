import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdynmkt_leadcapturev3submission request message
 *
 * Web API Action: msdynmkt_leadcapturev3submission
 */
export class msdynmkt_leadcapturev3submissionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_leadcapturev3submissionResponse>
{
  constructor(
    public msdynmkt_formsubmissionid: EntityReference,
    public msdynmkt_consentversion: string,
    public msdynmkt_marketingformid: EntityReference
  ) {
    super("msdynmkt_leadcapturev3submission");
  }

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
    return new msdynmkt_leadcapturev3submissionResponse();
  }
}

/**
 * msdynmkt_leadcapturev3submission response message
 */
export class msdynmkt_leadcapturev3submissionResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_leadcapturev3submission");
  }

  static fromResponse(_data: unknown): msdynmkt_leadcapturev3submissionResponse {
    return new msdynmkt_leadcapturev3submissionResponse();
  }
}
