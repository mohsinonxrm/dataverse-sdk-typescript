import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CustomApiCustomerServiceCaseSummaryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CustomApiCustomerServiceCaseSummary action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CustomApiCustomerServiceCaseSummaryResult {
  "@odata.context"?: string;
  msdyn_CaseSummary: string;
}

/**
 * msdyn_CustomApiCustomerServiceCaseSummary response message
 *
 * `result` is the value the msdyn_CustomApiCustomerServiceCaseSummary action returns (see {@link msdyn_CustomApiCustomerServiceCaseSummaryResult}).
 */
export class msdyn_CustomApiCustomerServiceCaseSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_CustomApiCustomerServiceCaseSummaryResult) {
    super("msdyn_CustomApiCustomerServiceCaseSummary");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CustomApiCustomerServiceCaseSummaryResponse {
    return new msdyn_CustomApiCustomerServiceCaseSummaryResponse(
      data as msdyn_CustomApiCustomerServiceCaseSummaryResult
    );
  }
}
