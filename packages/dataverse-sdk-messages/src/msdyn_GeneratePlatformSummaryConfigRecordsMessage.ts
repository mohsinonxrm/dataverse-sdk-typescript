import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GeneratePlatformSummaryConfigRecords request message
 *
 * Web API Action: msdyn_GeneratePlatformSummaryConfigRecords
 */
export class msdyn_GeneratePlatformSummaryConfigRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GeneratePlatformSummaryConfigRecordsResponse>
{
  constructor(public entityLogicalName: string) {
    super("msdyn_GeneratePlatformSummaryConfigRecords");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeneratePlatformSummaryConfigRecords`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GeneratePlatformSummaryConfigRecordsResponse> {
    const data = await response.json();
    return msdyn_GeneratePlatformSummaryConfigRecordsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityLogicalName: this.entityLogicalName,
    };
  }
}

/**
 * msdyn_GeneratePlatformSummaryConfigRecords response message
 */
export class msdyn_GeneratePlatformSummaryConfigRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GeneratePlatformSummaryConfigRecordsResponse) {
    super("msdyn_GeneratePlatformSummaryConfigRecords");
  }

  static fromResponse(data: unknown): msdyn_GeneratePlatformSummaryConfigRecordsResponse {
    return new msdyn_GeneratePlatformSummaryConfigRecordsResponse((data as any).value);
  }
}
