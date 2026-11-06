import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_checkconsentResponse as msdynmkt_checkconsentResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_checkconsent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_checkconsentRequestParameters {
  msdynmkt_contactpoint: string;
  msdynmkt_owningbusinessunitid: string;
  msdynmkt_purposeid: string;
  msdynmkt_compliancesettingsid: string;
  msdynmkt_topicid: string;
  msdynmkt_channeltype: string;
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
      msdynmkt_contactpoint: this.Parameters.msdynmkt_contactpoint,
      msdynmkt_owningbusinessunitid: this.Parameters.msdynmkt_owningbusinessunitid,
      msdynmkt_purposeid: this.Parameters.msdynmkt_purposeid,
      msdynmkt_compliancesettingsid: this.Parameters.msdynmkt_compliancesettingsid,
      msdynmkt_topicid: this.Parameters.msdynmkt_topicid,
      msdynmkt_channeltype: this.Parameters.msdynmkt_channeltype,
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
    // 204 No Content is an empty result
    if (response.status === 204) return msdynmkt_checkconsentResponse.fromResponse({});
    return msdynmkt_checkconsentResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_checkconsent response message
 */
export class msdynmkt_checkconsentResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_checkconsentResponseData) {
    super("msdynmkt_checkconsent");
  }

  static fromResponse(data: unknown): msdynmkt_checkconsentResponse {
    return new msdynmkt_checkconsentResponse(
      responseObject<msdynmkt_checkconsentResponseData>(data)
    );
  }
}
