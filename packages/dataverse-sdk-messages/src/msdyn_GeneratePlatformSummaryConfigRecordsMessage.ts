import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GeneratePlatformSummaryConfigRecords message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GeneratePlatformSummaryConfigRecordsRequestParameters {
  EntityLogicalName?: string;
}

/**
 * msdyn_GeneratePlatformSummaryConfigRecords request message
 *
 * Web API Action: msdyn_GeneratePlatformSummaryConfigRecords
 */
export class msdyn_GeneratePlatformSummaryConfigRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GeneratePlatformSummaryConfigRecordsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GeneratePlatformSummaryConfigRecordsRequestParameters>;

  constructor(parameters: msdyn_GeneratePlatformSummaryConfigRecordsRequestParameters = {}) {
    super("msdyn_GeneratePlatformSummaryConfigRecords", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeneratePlatformSummaryConfigRecords`;

    const body = requestBody({
      EntityLogicalName: this.Parameters.EntityLogicalName,
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
  ): Promise<msdyn_GeneratePlatformSummaryConfigRecordsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GeneratePlatformSummaryConfigRecordsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GeneratePlatformSummaryConfigRecords action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GeneratePlatformSummaryConfigRecordsResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_GeneratePlatformSummaryConfigRecords response message
 *
 * `result` is the value the msdyn_GeneratePlatformSummaryConfigRecords action returns (see {@link msdyn_GeneratePlatformSummaryConfigRecordsResult}).
 */
export class msdyn_GeneratePlatformSummaryConfigRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GeneratePlatformSummaryConfigRecordsResult) {
    super("msdyn_GeneratePlatformSummaryConfigRecords");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GeneratePlatformSummaryConfigRecordsResponse {
    return new msdyn_GeneratePlatformSummaryConfigRecordsResponse(
      data as msdyn_GeneratePlatformSummaryConfigRecordsResult
    );
  }
}
