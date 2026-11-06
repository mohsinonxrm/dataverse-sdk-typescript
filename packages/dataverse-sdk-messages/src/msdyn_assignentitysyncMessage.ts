import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_assignentitysyncResponse as msdyn_assignentitysyncResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_assignentitysync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_assignentitysyncRequestParameters {
  RegardingEntityId: string;
  RegardingEntityName: string;
  SegmentId: string;
}

/**
 * msdyn_assignentitysync request message
 *
 * Web API Action: msdyn_assignentitysync
 */
export class msdyn_assignentitysyncRequest
  extends OrganizationRequest
  implements Executable<msdyn_assignentitysyncResponse>
{
  declare readonly Parameters: Readonly<msdyn_assignentitysyncRequestParameters>;

  constructor(parameters: msdyn_assignentitysyncRequestParameters) {
    super("msdyn_assignentitysync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_assignentitysync`;

    const body = requestBody({
      RegardingEntityId: this.Parameters.RegardingEntityId,
      RegardingEntityName: this.Parameters.RegardingEntityName,
      SegmentId: this.Parameters.SegmentId,
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

  async parseResponse(response: Response): Promise<msdyn_assignentitysyncResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_assignentitysyncResponse.fromResponse({});
    return msdyn_assignentitysyncResponse.fromResponse(await response.json());
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
