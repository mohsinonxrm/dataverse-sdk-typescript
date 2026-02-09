import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetTimeLineRecords request message
 *
 * Web API Action: msdyn_GetTimeLineRecords
 */
export class msdyn_GetTimeLineRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetTimeLineRecordsResponse>
{
  constructor(
    public regardingObjectId: string,
    public numberOfRecords: string
  ) {
    super("msdyn_GetTimeLineRecords");
  }

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
    return msdyn_GetTimeLineRecordsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RegardingObjectId: this.regardingObjectId,
      NumberOfRecords: this.numberOfRecords,
    };
  }
}

/**
 * msdyn_GetTimeLineRecords response message
 */
export class msdyn_GetTimeLineRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetTimeLineRecordsResponse) {
    super("msdyn_GetTimeLineRecords");
  }

  static fromResponse(data: unknown): msdyn_GetTimeLineRecordsResponse {
    return new msdyn_GetTimeLineRecordsResponse((data as any).value);
  }
}
