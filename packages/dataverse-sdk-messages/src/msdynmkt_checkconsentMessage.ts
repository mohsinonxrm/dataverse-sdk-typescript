import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_checkconsent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_checkconsentRequestParameters {
  msdynmkt_owningbusinessunitid: string;
  msdynmkt_contactpoint: string;
  msdynmkt_topicid: string;
  msdynmkt_purposeid: string;
  msdynmkt_channeltype: string;
  msdynmkt_compliancesettingsid: string;
}

/**
 * msdynmkt_checkconsent request message
 *
 * Web API Action: msdynmkt_checkconsent
 */
export class msdynmkt_checkconsentRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_checkconsentResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_checkconsentRequestParameters>;

  constructor(parameters: msdynmkt_checkconsentRequestParameters) {
    super("msdynmkt_checkconsent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_checkconsent`;

    const body = requestBody({
      msdynmkt_owningbusinessunitid: this.Parameters.msdynmkt_owningbusinessunitid,
      msdynmkt_contactpoint: this.Parameters.msdynmkt_contactpoint,
      msdynmkt_topicid: this.Parameters.msdynmkt_topicid,
      msdynmkt_purposeid: this.Parameters.msdynmkt_purposeid,
      msdynmkt_channeltype: this.Parameters.msdynmkt_channeltype,
      msdynmkt_compliancesettingsid: this.Parameters.msdynmkt_compliancesettingsid,
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

  async parseResponse(response: Response): Promise<msdynmkt_checkconsentResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_checkconsentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_checkconsent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_checkconsentResult {
  "@odata.context"?: string;
  msdynmkt_errormessage: string;
  msdynmkt_isconsentgiven: boolean;
  msdynmkt_issuccess: boolean;
  msdynmkt_reason: string;
}

/**
 * msdynmkt_checkconsent response message
 *
 * `result` is the value the msdynmkt_checkconsent action returns (see {@link msdynmkt_checkconsentResult}).
 */
export class msdynmkt_checkconsentResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_checkconsentResult) {
    super("msdynmkt_checkconsent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_checkconsentResponse {
    return new msdynmkt_checkconsentResponse(data as msdynmkt_checkconsentResult);
  }
}
