import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetTimeLineRecordsResponse as msdyn_GetTimeLineRecordsResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetTimeLineRecordsResponse> {
    const data = await response.json();
    return msdyn_GetTimeLineRecordsResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetTimeLineRecords response message
 */
export class msdyn_GetTimeLineRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetTimeLineRecordsResponseData) {
    super("msdyn_GetTimeLineRecords");
  }

  static fromResponse(data: unknown): msdyn_GetTimeLineRecordsResponse {
    return new msdyn_GetTimeLineRecordsResponse(
      responseObject<msdyn_GetTimeLineRecordsResponseData>(data)
    );
  }
}
