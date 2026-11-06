import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_enabledoubleoptincompliance message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_enabledoubleoptincomplianceRequestParameters {
  msdynmkt_complianceid: string;
}

/**
 * msdynmkt_enabledoubleoptincompliance request message
 *
 * Web API Action: msdynmkt_enabledoubleoptincompliance
 */
export class msdynmkt_enabledoubleoptincomplianceRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_enabledoubleoptincomplianceResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_enabledoubleoptincomplianceRequestParameters>;

  constructor(parameters: msdynmkt_enabledoubleoptincomplianceRequestParameters) {
    super("msdynmkt_enabledoubleoptincompliance", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_enabledoubleoptincompliance`;

    const body = requestBody({
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

  parseResponse(_response: Response): Promise<msdynmkt_enabledoubleoptincomplianceResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdynmkt_enabledoubleoptincomplianceResponse());
  }
}

/**
 * msdynmkt_enabledoubleoptincompliance response message
 */
export class msdynmkt_enabledoubleoptincomplianceResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_enabledoubleoptincompliance");
  }

  static fromResponse(_data?: unknown): msdynmkt_enabledoubleoptincomplianceResponse {
    return new msdynmkt_enabledoubleoptincomplianceResponse();
  }
}
