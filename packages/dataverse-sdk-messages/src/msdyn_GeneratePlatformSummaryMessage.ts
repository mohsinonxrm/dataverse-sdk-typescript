import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GeneratePlatformSummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GeneratePlatformSummaryRequestParameters {
  OtherData?: string;
  ClientContext?: string;
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
      OtherData: this.Parameters.OtherData,
      ClientContext: this.Parameters.ClientContext,
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
    // The body is the complex value, with its @odata.context
    return msdyn_GeneratePlatformSummaryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GeneratePlatformSummary action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GeneratePlatformSummaryResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_GeneratePlatformSummary response message
 *
 * `result` is the value the msdyn_GeneratePlatformSummary action returns (see {@link msdyn_GeneratePlatformSummaryResult}).
 */
export class msdyn_GeneratePlatformSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_GeneratePlatformSummaryResult) {
    super("msdyn_GeneratePlatformSummary");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GeneratePlatformSummaryResponse {
    return new msdyn_GeneratePlatformSummaryResponse(data as msdyn_GeneratePlatformSummaryResult);
  }
}
