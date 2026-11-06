import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * msdynmkt_leadcapturev4submission request message
 *
 * Web API Action: msdynmkt_leadcapturev4submission
 */
export class msdynmkt_leadcapturev4submissionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_leadcapturev4submissionResponse>
{
  constructor(
    public msdynmkt_consentversion: string | undefined,
    public msdynmkt_marketingformid: EntityReference | AnyEntityPayload,
    public msdynmkt_formsubmissionid: EntityReference | AnyEntityPayload
  ) {
    super("msdynmkt_leadcapturev4submission");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_leadcapturev4submissionResponse> {
    // No return value (204 No Content)
    return new msdynmkt_leadcapturev4submissionResponse();
  }
}

/**
 * msdynmkt_leadcapturev4submission response message
 */
export class msdynmkt_leadcapturev4submissionResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_leadcapturev4submission");
  }

  static fromResponse(_data: unknown): msdynmkt_leadcapturev4submissionResponse {
    return new msdynmkt_leadcapturev4submissionResponse();
  }
}
