import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_EnableDoubleOptInComplianceV2 request message
 *
 * Web API Action: msdynmkt_EnableDoubleOptInComplianceV2
 */
export class msdynmkt_EnableDoubleOptInComplianceV2Request
  extends OrganizationRequest
  implements Executable<msdynmkt_EnableDoubleOptInComplianceV2Response>
{
  constructor(public msdynmkt_complianceid: string) {
    super("msdynmkt_EnableDoubleOptInComplianceV2");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_EnableDoubleOptInComplianceV2`;

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

  async parseResponse(response: Response): Promise<msdynmkt_EnableDoubleOptInComplianceV2Response> {
    // No return value (204 No Content)
    return new msdynmkt_EnableDoubleOptInComplianceV2Response();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdynmkt_complianceid: this.msdynmkt_complianceid,
    };
  }
}

/**
 * msdynmkt_EnableDoubleOptInComplianceV2 response message
 */
export class msdynmkt_EnableDoubleOptInComplianceV2Response extends OrganizationResponse {
  constructor() {
    super("msdynmkt_EnableDoubleOptInComplianceV2");
  }

  static fromResponse(_data: unknown): msdynmkt_EnableDoubleOptInComplianceV2Response {
    return new msdynmkt_EnableDoubleOptInComplianceV2Response();
  }
}
