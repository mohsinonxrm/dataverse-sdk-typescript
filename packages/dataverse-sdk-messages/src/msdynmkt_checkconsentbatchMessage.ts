import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_checkconsentbatch message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_checkconsentbatchRequestParameters {
  msdynmkt_topicid?: string;
  msdynmkt_compliancesettingsid: string;
  msdynmkt_owningbusinessunitid?: string;
  msdynmkt_purposeid: string;
  msdynmkt_channeltype: string;
  msdynmkt_contactpoints: string[];
}

/**
 * msdynmkt_checkconsentbatch request message
 *
 * Web API Action: msdynmkt_checkconsentbatch
 */
export class msdynmkt_checkconsentbatchRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_checkconsentbatchResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_checkconsentbatchRequestParameters>;

  constructor(parameters: msdynmkt_checkconsentbatchRequestParameters) {
    super("msdynmkt_checkconsentbatch", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_checkconsentbatch`;

    const body = requestBody({
      msdynmkt_topicid: this.Parameters.msdynmkt_topicid,
      msdynmkt_compliancesettingsid: this.Parameters.msdynmkt_compliancesettingsid,
      msdynmkt_owningbusinessunitid: this.Parameters.msdynmkt_owningbusinessunitid,
      msdynmkt_purposeid: this.Parameters.msdynmkt_purposeid,
      msdynmkt_channeltype: this.Parameters.msdynmkt_channeltype,
      msdynmkt_contactpoints: this.Parameters.msdynmkt_contactpoints,
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

  async parseResponse(response: Response): Promise<msdynmkt_checkconsentbatchResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_checkconsentbatchResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_checkconsentbatch action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_checkconsentbatchResult {
  "@odata.context"?: string;
  msdynmkt_errormessage: string;
  msdynmkt_issuccess: boolean;
}

/**
 * msdynmkt_checkconsentbatch response message
 *
 * `result` is the value the msdynmkt_checkconsentbatch action returns (see {@link msdynmkt_checkconsentbatchResult}).
 */
export class msdynmkt_checkconsentbatchResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_checkconsentbatchResult) {
    super("msdynmkt_checkconsentbatch");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_checkconsentbatchResponse {
    return new msdynmkt_checkconsentbatchResponse(data as msdynmkt_checkconsentbatchResult);
  }
}
