import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_consentsubmission message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_consentsubmissionRequestParameters {
  msdynmkt_contactpointtype: number;
  msdynmkt_consentversion?: string;
  msdynmkt_purposeconsents: string;
  msdynmkt_trackingcontextid?: string;
  msdynmkt_preferencecenterid?: string;
  msdynmkt_topicconsents?: string;
  msdynmkt_contactpointvalue: string;
}

/**
 * msdynmkt_consentsubmission request message
 *
 * Web API Action: msdynmkt_consentsubmission
 */
export class msdynmkt_consentsubmissionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_consentsubmissionResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_consentsubmissionRequestParameters>;

  constructor(parameters: msdynmkt_consentsubmissionRequestParameters) {
    super("msdynmkt_consentsubmission", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_consentsubmission`;

    const body = requestBody({
      msdynmkt_contactpointtype: this.Parameters.msdynmkt_contactpointtype,
      msdynmkt_consentversion: this.Parameters.msdynmkt_consentversion,
      msdynmkt_purposeconsents: this.Parameters.msdynmkt_purposeconsents,
      msdynmkt_trackingcontextid: this.Parameters.msdynmkt_trackingcontextid,
      msdynmkt_preferencecenterid: this.Parameters.msdynmkt_preferencecenterid,
      msdynmkt_topicconsents: this.Parameters.msdynmkt_topicconsents,
      msdynmkt_contactpointvalue: this.Parameters.msdynmkt_contactpointvalue,
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

  async parseResponse(response: Response): Promise<msdynmkt_consentsubmissionResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_consentsubmissionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_consentsubmission action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_consentsubmissionResult {
  "@odata.context"?: string;
  msdynmkt_consentsubmissionresponse: string;
}

/**
 * msdynmkt_consentsubmission response message
 *
 * `result` is the value the msdynmkt_consentsubmission action returns (see {@link msdynmkt_consentsubmissionResult}).
 */
export class msdynmkt_consentsubmissionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_consentsubmissionResult) {
    super("msdynmkt_consentsubmission");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_consentsubmissionResponse {
    return new msdynmkt_consentsubmissionResponse(data as msdynmkt_consentsubmissionResult);
  }
}
