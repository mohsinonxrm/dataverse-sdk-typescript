import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_enabledoubleoptincompliance request message
 *
 * Web API Action: msdynmkt_enabledoubleoptincompliance
 */
export class msdynmkt_enabledoubleoptincomplianceRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_enabledoubleoptincomplianceResponse>
{
  constructor(public msdynmkt_complianceid: string) {
    super("msdynmkt_enabledoubleoptincompliance");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_enabledoubleoptincompliance`;

    const body: Record<string, unknown> = {
      msdynmkt_complianceid: this.msdynmkt_complianceid,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_enabledoubleoptincomplianceResponse> {
    // No return value (204 No Content)
    return new msdynmkt_enabledoubleoptincomplianceResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdynmkt_complianceid: this.msdynmkt_complianceid,
    };
  }
}

/**
 * msdynmkt_enabledoubleoptincompliance response message
 */
export class msdynmkt_enabledoubleoptincomplianceResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_enabledoubleoptincompliance");
  }

  static fromResponse(_data: unknown): msdynmkt_enabledoubleoptincomplianceResponse {
    return new msdynmkt_enabledoubleoptincomplianceResponse();
  }
}
