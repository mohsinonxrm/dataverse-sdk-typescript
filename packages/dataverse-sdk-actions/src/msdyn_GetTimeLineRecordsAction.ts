import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetTimeLineRecords action
 */
export interface msdyn_GetTimeLineRecordsResponse {
  TimeLineWallRecords: string;
}

/**
 * msdyn_GetTimeLineRecords action
 *
 * Unbound action
 */
export class msdyn_GetTimeLineRecordsAction implements Executable<msdyn_GetTimeLineRecordsResponse> {
  constructor(
    public readonly regardingObjectId: string,
    public readonly numberOfRecords: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTimeLineRecords`;

    const body: Record<string, unknown> = {
      RegardingObjectId: this.regardingObjectId,
      NumberOfRecords: this.numberOfRecords,
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

  async parseResponse(response: Response): Promise<msdyn_GetTimeLineRecordsResponse> {
    const data = await response.json();
    return data as msdyn_GetTimeLineRecordsResponse;
  }
}
