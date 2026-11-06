import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdynmkt_leadcapturev3submission message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_leadcapturev3submissionRequestParameters {
  msdynmkt_marketingformid: EntityReference | AnyEntityPayload;
  msdynmkt_formsubmissionid: EntityReference | AnyEntityPayload;
  msdynmkt_consentversion?: string;
}

/**
 * msdynmkt_leadcapturev3submission request message
 *
 * Web API Action: msdynmkt_leadcapturev3submission
 */
export class msdynmkt_leadcapturev3submissionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_leadcapturev3submissionResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_leadcapturev3submissionRequestParameters>;

  constructor(parameters: msdynmkt_leadcapturev3submissionRequestParameters) {
    super("msdynmkt_leadcapturev3submission", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_leadcapturev3submission`;

    const body = requestBody({
      msdynmkt_marketingformid: this.Parameters.msdynmkt_marketingformid,
      msdynmkt_formsubmissionid: this.Parameters.msdynmkt_formsubmissionid,
      msdynmkt_consentversion: this.Parameters.msdynmkt_consentversion,
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

  parseResponse(_response: Response): Promise<msdynmkt_leadcapturev3submissionResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdynmkt_leadcapturev3submissionResponse());
  }
}

/**
 * msdynmkt_leadcapturev3submission response message
 */
export class msdynmkt_leadcapturev3submissionResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_leadcapturev3submission");
  }

  static fromResponse(_data?: unknown): msdynmkt_leadcapturev3submissionResponse {
    return new msdynmkt_leadcapturev3submissionResponse();
  }
}
