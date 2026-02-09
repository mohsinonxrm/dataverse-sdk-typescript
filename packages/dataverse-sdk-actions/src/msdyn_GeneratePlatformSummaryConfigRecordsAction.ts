import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GeneratePlatformSummaryConfigRecords action
 */
export interface msdyn_GeneratePlatformSummaryConfigRecordsResponse {
  Result: string;
}

/**
 * msdyn_GeneratePlatformSummaryConfigRecords action
 *
 * Unbound action
 */
export class msdyn_GeneratePlatformSummaryConfigRecordsAction implements Executable<msdyn_GeneratePlatformSummaryConfigRecordsResponse> {
  constructor(public readonly entityLogicalName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeneratePlatformSummaryConfigRecords`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GeneratePlatformSummaryConfigRecordsResponse> {
    const data = await response.json();
    return data as msdyn_GeneratePlatformSummaryConfigRecordsResponse;
  }
}
