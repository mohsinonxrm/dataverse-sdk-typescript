import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_doubleoptinstatusResponse as msdynmkt_doubleoptinstatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_doubleoptinstatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_doubleoptinstatusRequestParameters {
  DOI_Job_Status?: string;
  msdynmkt_complianceid: string;
}

/**
 * msdynmkt_doubleoptinstatus request message
 *
 * Web API Action: msdynmkt_doubleoptinstatus
 */
export class msdynmkt_doubleoptinstatusRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_doubleoptinstatusResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_doubleoptinstatusRequestParameters>;

  constructor(parameters: msdynmkt_doubleoptinstatusRequestParameters) {
    super("msdynmkt_doubleoptinstatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_doubleoptinstatus`;

    const body = requestBody({
      DOI_Job_Status: this.Parameters.DOI_Job_Status,
      msdynmkt_complianceid: this.Parameters.msdynmkt_complianceid,
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

  async parseResponse(response: Response): Promise<msdynmkt_doubleoptinstatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdynmkt_doubleoptinstatusResponse.fromResponse({});
    return msdynmkt_doubleoptinstatusResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_doubleoptinstatus response message
 */
export class msdynmkt_doubleoptinstatusResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_doubleoptinstatusResponseData) {
    super("msdynmkt_doubleoptinstatus");
  }

  static fromResponse(data: unknown): msdynmkt_doubleoptinstatusResponse {
    return new msdynmkt_doubleoptinstatusResponse(
      responseObject<msdynmkt_doubleoptinstatusResponseData>(data)
    );
  }
}
