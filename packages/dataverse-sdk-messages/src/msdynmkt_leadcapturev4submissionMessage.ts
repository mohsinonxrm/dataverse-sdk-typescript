import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdynmkt_leadcapturev4submission message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_leadcapturev4submissionRequestParameters {
  msdynmkt_marketingformid: EntityReference | AnyEntityPayload;
  msdynmkt_consentversion?: string;
  msdynmkt_formsubmissionid: EntityReference | AnyEntityPayload;
}

/**
 * msdynmkt_leadcapturev4submission request message
 *
 * Web API Action: msdynmkt_leadcapturev4submission
 */
export class msdynmkt_leadcapturev4submissionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_leadcapturev4submissionResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_leadcapturev4submissionRequestParameters>;

  constructor(parameters: msdynmkt_leadcapturev4submissionRequestParameters) {
    super("msdynmkt_leadcapturev4submission", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_leadcapturev4submission`;

    const body = requestBody({
      msdynmkt_marketingformid: this.Parameters.msdynmkt_marketingformid,
      msdynmkt_consentversion: this.Parameters.msdynmkt_consentversion,
      msdynmkt_formsubmissionid: this.Parameters.msdynmkt_formsubmissionid,
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
