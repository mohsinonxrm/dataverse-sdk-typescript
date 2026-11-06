import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_EnableDoubleOptInComplianceV2 message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_EnableDoubleOptInComplianceV2RequestParameters {
  msdynmkt_complianceid: string;
}

/**
 * msdynmkt_EnableDoubleOptInComplianceV2 request message
 *
 * Web API Action: msdynmkt_EnableDoubleOptInComplianceV2
 */
export class msdynmkt_EnableDoubleOptInComplianceV2Request
  extends OrganizationRequest
  implements Executable<msdynmkt_EnableDoubleOptInComplianceV2Response>
{
  declare readonly Parameters: Readonly<msdynmkt_EnableDoubleOptInComplianceV2RequestParameters>;

  constructor(parameters: msdynmkt_EnableDoubleOptInComplianceV2RequestParameters) {
    super("msdynmkt_EnableDoubleOptInComplianceV2", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_EnableDoubleOptInComplianceV2`;

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

  async parseResponse(response: Response): Promise<msdynmkt_EnableDoubleOptInComplianceV2Response> {
    // No return value (204 No Content)
    return new msdynmkt_EnableDoubleOptInComplianceV2Response();
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
