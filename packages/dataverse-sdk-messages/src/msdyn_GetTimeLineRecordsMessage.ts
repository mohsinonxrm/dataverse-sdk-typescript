import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetTimeLineRecordsResponse as msdyn_GetTimeLineRecordsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetTimeLineRecords message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetTimeLineRecordsRequestParameters {
  RegardingObjectId: string;
  NumberOfRecords: string;
}

/**
 * msdyn_GetTimeLineRecords request message
 *
 * Web API Action: msdyn_GetTimeLineRecords
 */
export class msdyn_GetTimeLineRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetTimeLineRecordsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetTimeLineRecordsRequestParameters>;

  constructor(parameters: msdyn_GetTimeLineRecordsRequestParameters) {
    super("msdyn_GetTimeLineRecords", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTimeLineRecords`;

    const body = requestBody({
      RegardingObjectId: this.Parameters.RegardingObjectId,
      NumberOfRecords: this.Parameters.NumberOfRecords,
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

  async parseResponse(response: Response): Promise<msdyn_GetTimeLineRecordsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetTimeLineRecordsResponse.fromResponse({});
    return msdyn_GetTimeLineRecordsResponse.fromResponse(await response.json());
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
