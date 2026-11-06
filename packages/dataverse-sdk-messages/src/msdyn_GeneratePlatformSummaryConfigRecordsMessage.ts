import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GeneratePlatformSummaryConfigRecordsResponse as msdyn_GeneratePlatformSummaryConfigRecordsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GeneratePlatformSummaryConfigRecordsResponse.fromResponse({});
    return msdyn_GeneratePlatformSummaryConfigRecordsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GeneratePlatformSummaryConfigRecords response message
 */
export class msdyn_GeneratePlatformSummaryConfigRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GeneratePlatformSummaryConfigRecordsResponseData) {
    super("msdyn_GeneratePlatformSummaryConfigRecords");
  }

  static fromResponse(data: unknown): msdyn_GeneratePlatformSummaryConfigRecordsResponse {
    return new msdyn_GeneratePlatformSummaryConfigRecordsResponse(
      responseObject<msdyn_GeneratePlatformSummaryConfigRecordsResponseData>(data)
    );
  }
}
