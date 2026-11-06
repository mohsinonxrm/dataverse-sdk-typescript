import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GeneratePlatformSummaryResponse as msdyn_GeneratePlatformSummaryResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GeneratePlatformSummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GeneratePlatformSummaryRequestParameters {
  ClientContext?: string;
  OtherData?: string;
}

/**
 * msdyn_GeneratePlatformSummary request message
 *
 * Web API Action: msdyn_GeneratePlatformSummary
 */
export class msdyn_GeneratePlatformSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_GeneratePlatformSummaryResponse>
{
  declare readonly Parameters: Readonly<msdyn_GeneratePlatformSummaryRequestParameters>;

  constructor(parameters: msdyn_GeneratePlatformSummaryRequestParameters = {}) {
    super("msdyn_GeneratePlatformSummary", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeneratePlatformSummary`;

    const body = requestBody({
      ClientContext: this.Parameters.ClientContext,
      OtherData: this.Parameters.OtherData,
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

  async parseResponse(response: Response): Promise<msdyn_GeneratePlatformSummaryResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GeneratePlatformSummaryResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GeneratePlatformSummary response message
 */
export class msdyn_GeneratePlatformSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_GeneratePlatformSummaryResponseData) {
    super("msdyn_GeneratePlatformSummary");
  }

  static fromResponse(data: unknown): msdyn_GeneratePlatformSummaryResponse {
    return new msdyn_GeneratePlatformSummaryResponse(
      responseObject<msdyn_GeneratePlatformSummaryResponseData>(data)
    );
  }
}
