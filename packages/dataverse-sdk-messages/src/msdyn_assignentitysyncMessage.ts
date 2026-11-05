import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_assignentitysyncResponse as msdyn_assignentitysyncResponseData } from "./types/index.js";

/**
 * msdyn_assignentitysync request message
 *
 * Web API Action: msdyn_assignentitysync
 */
export class msdyn_assignentitysyncRequest
  extends OrganizationRequest
  implements Executable<msdyn_assignentitysyncResponse>
{
  constructor(
    public regardingEntityId: string,
    public regardingEntityName: string,
    public segmentId: string
  ) {
    super("msdyn_assignentitysync");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_assignentitysync`;

    const body: Record<string, unknown> = {
      RegardingEntityId: this.regardingEntityId,
      RegardingEntityName: this.regardingEntityName,
      SegmentId: this.segmentId,
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

  async parseResponse(response: Response): Promise<msdyn_assignentitysyncResponse> {
    const data = await response.json();
    return msdyn_assignentitysyncResponse.fromResponse(data);
  }
}

/**
 * msdyn_assignentitysync response message
 */
export class msdyn_assignentitysyncResponse extends OrganizationResponse {
  constructor(public result: msdyn_assignentitysyncResponseData) {
    super("msdyn_assignentitysync");
  }

  static fromResponse(data: unknown): msdyn_assignentitysyncResponse {
    return new msdyn_assignentitysyncResponse(
      responseObject<msdyn_assignentitysyncResponseData>(data)
    );
  }
}
