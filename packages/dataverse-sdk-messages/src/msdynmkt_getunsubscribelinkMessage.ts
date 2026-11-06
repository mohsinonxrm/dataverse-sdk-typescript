import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_getunsubscribelink message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_getunsubscribelinkRequestParameters {
  msdynmkt_sourceapplication?: string;
  msdynmkt_entityid: string;
  msdynmkt_owningbusinessunitid?: string;
  msdynmkt_topicid?: string;
  msdynmkt_oneclickunsubscribelink?: boolean;
  msdynmkt_contactpoint: string;
  msdynmkt_messagetemplateid: string;
  msdynmkt_compliancesettingsid: string;
  msdynmkt_purposeid: string;
  msdynmkt_entitytype: string;
  msdynmkt_sourcemessageentityname?: string;
}

/**
 * msdynmkt_getunsubscribelink request message
 *
 * Web API Action: msdynmkt_getunsubscribelink
 */
export class msdynmkt_getunsubscribelinkRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_getunsubscribelinkResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_getunsubscribelinkRequestParameters>;

  constructor(parameters: msdynmkt_getunsubscribelinkRequestParameters) {
    super("msdynmkt_getunsubscribelink", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getunsubscribelink`;

    const body = requestBody({
      msdynmkt_sourceapplication: this.Parameters.msdynmkt_sourceapplication,
      msdynmkt_entityid: this.Parameters.msdynmkt_entityid,
      msdynmkt_owningbusinessunitid: this.Parameters.msdynmkt_owningbusinessunitid,
      msdynmkt_topicid: this.Parameters.msdynmkt_topicid,
      msdynmkt_oneclickunsubscribelink: this.Parameters.msdynmkt_oneclickunsubscribelink,
      msdynmkt_contactpoint: this.Parameters.msdynmkt_contactpoint,
      msdynmkt_messagetemplateid: this.Parameters.msdynmkt_messagetemplateid,
      msdynmkt_compliancesettingsid: this.Parameters.msdynmkt_compliancesettingsid,
      msdynmkt_purposeid: this.Parameters.msdynmkt_purposeid,
      msdynmkt_entitytype: this.Parameters.msdynmkt_entitytype,
      msdynmkt_sourcemessageentityname: this.Parameters.msdynmkt_sourcemessageentityname,
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

  async parseResponse(response: Response): Promise<msdynmkt_getunsubscribelinkResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_getunsubscribelinkResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_getunsubscribelink action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_getunsubscribelinkResult {
  "@odata.context"?: string;
  msdynmkt_companyaddress: string;
  msdynmkt_errormessage: string;
  msdynmkt_issuccess: boolean;
  msdynmkt_unsubscribelink: string;
}

/**
 * msdynmkt_getunsubscribelink response message
 *
 * `result` is the value the msdynmkt_getunsubscribelink action returns (see {@link msdynmkt_getunsubscribelinkResult}).
 */
export class msdynmkt_getunsubscribelinkResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_getunsubscribelinkResult) {
    super("msdynmkt_getunsubscribelink");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_getunsubscribelinkResponse {
    return new msdynmkt_getunsubscribelinkResponse(data as msdynmkt_getunsubscribelinkResult);
  }
}
