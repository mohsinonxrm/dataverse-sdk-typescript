import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CustomApiCustomerServiceCaseSummaryResponse as msdyn_CustomApiCustomerServiceCaseSummaryResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CustomApiCustomerServiceCaseSummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CustomApiCustomerServiceCaseSummaryRequestParameters {
  msdyn_CaseNumber: string;
}

/**
 * msdyn_CustomApiCustomerServiceCaseSummary request message
 *
 * Web API Action: msdyn_CustomApiCustomerServiceCaseSummary
 */
export class msdyn_CustomApiCustomerServiceCaseSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_CustomApiCustomerServiceCaseSummaryResponse>
{
  declare readonly Parameters: Readonly<msdyn_CustomApiCustomerServiceCaseSummaryRequestParameters>;

  constructor(parameters: msdyn_CustomApiCustomerServiceCaseSummaryRequestParameters) {
    super("msdyn_CustomApiCustomerServiceCaseSummary", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CustomApiCustomerServiceCaseSummary`;

    const body = requestBody({
      msdyn_CaseNumber: this.Parameters.msdyn_CaseNumber,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CustomApiCustomerServiceCaseSummaryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CustomApiCustomerServiceCaseSummaryResponse.fromResponse({});
    return msdyn_CustomApiCustomerServiceCaseSummaryResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CustomApiCustomerServiceCaseSummary response message
 */
export class msdyn_CustomApiCustomerServiceCaseSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_CustomApiCustomerServiceCaseSummaryResponseData) {
    super("msdyn_CustomApiCustomerServiceCaseSummary");
  }

  static fromResponse(data: unknown): msdyn_CustomApiCustomerServiceCaseSummaryResponse {
    return new msdyn_CustomApiCustomerServiceCaseSummaryResponse(
      responseObject<msdyn_CustomApiCustomerServiceCaseSummaryResponseData>(data)
    );
  }
}
