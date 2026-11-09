import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetSalesRowSummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesRowSummaryRequestParameters {
  ClientContext?: string;
  OtherData?: string;
}

/**
 * msdyn_GetSalesRowSummary request message
 *
 * Web API Action: msdyn_GetSalesRowSummary
 */
export class msdyn_GetSalesRowSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesRowSummaryResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSalesRowSummaryRequestParameters>;

  constructor(parameters: msdyn_GetSalesRowSummaryRequestParameters = {}) {
    super("msdyn_GetSalesRowSummary", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesRowSummary`;

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

  async parseResponse(response: Response): Promise<msdyn_GetSalesRowSummaryResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSalesRowSummaryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSalesRowSummary action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSalesRowSummaryResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_GetSalesRowSummary response message
 *
 * `result` is the value the msdyn_GetSalesRowSummary action returns (see {@link msdyn_GetSalesRowSummaryResult}).
 */
export class msdyn_GetSalesRowSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesRowSummaryResult) {
    super("msdyn_GetSalesRowSummary");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSalesRowSummaryResponse {
    return new msdyn_GetSalesRowSummaryResponse(data as msdyn_GetSalesRowSummaryResult);
  }
}
