import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_getunsubscribelinkResponse as msdynmkt_getunsubscribelinkResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_getunsubscribelink message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_getunsubscribelinkRequestParameters {
  msdynmkt_purposeid: string;
  msdynmkt_sourcemessageentityname?: string;
  msdynmkt_messagetemplateid: string;
  msdynmkt_owningbusinessunitid?: string;
  msdynmkt_entitytype: string;
  msdynmkt_entityid: string;
  msdynmkt_contactpoint: string;
  msdynmkt_oneclickunsubscribelink?: boolean;
  msdynmkt_compliancesettingsid: string;
  msdynmkt_topicid?: string;
  msdynmkt_sourceapplication?: string;
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
      msdynmkt_purposeid: this.Parameters.msdynmkt_purposeid,
      msdynmkt_sourcemessageentityname: this.Parameters.msdynmkt_sourcemessageentityname,
      msdynmkt_messagetemplateid: this.Parameters.msdynmkt_messagetemplateid,
      msdynmkt_owningbusinessunitid: this.Parameters.msdynmkt_owningbusinessunitid,
      msdynmkt_entitytype: this.Parameters.msdynmkt_entitytype,
      msdynmkt_entityid: this.Parameters.msdynmkt_entityid,
      msdynmkt_contactpoint: this.Parameters.msdynmkt_contactpoint,
      msdynmkt_oneclickunsubscribelink: this.Parameters.msdynmkt_oneclickunsubscribelink,
      msdynmkt_compliancesettingsid: this.Parameters.msdynmkt_compliancesettingsid,
      msdynmkt_topicid: this.Parameters.msdynmkt_topicid,
      msdynmkt_sourceapplication: this.Parameters.msdynmkt_sourceapplication,
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
    // 204 No Content is an empty result
    if (response.status === 204) return msdynmkt_getunsubscribelinkResponse.fromResponse({});
    return msdynmkt_getunsubscribelinkResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_getunsubscribelink response message
 */
export class msdynmkt_getunsubscribelinkResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_getunsubscribelinkResponseData) {
    super("msdynmkt_getunsubscribelink");
  }

  static fromResponse(data: unknown): msdynmkt_getunsubscribelinkResponse {
    return new msdynmkt_getunsubscribelinkResponse(
      responseObject<msdynmkt_getunsubscribelinkResponseData>(data)
    );
  }
}
