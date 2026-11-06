import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_OCResetInviteParamsInfoResponse as msdyn_OCResetInviteParamsInfoResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_OCResetInviteParamsInfo message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OCResetInviteParamsInfoRequestParameters {
  LiveWorkItemId: string;
}

/**
 * msdyn_OCResetInviteParamsInfo request message
 *
 * Web API Action: msdyn_OCResetInviteParamsInfo
 */
export class msdyn_OCResetInviteParamsInfoRequest
  extends OrganizationRequest
  implements Executable<msdyn_OCResetInviteParamsInfoResponse>
{
  declare readonly Parameters: Readonly<msdyn_OCResetInviteParamsInfoRequestParameters>;

  constructor(parameters: msdyn_OCResetInviteParamsInfoRequestParameters) {
    super("msdyn_OCResetInviteParamsInfo", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OCResetInviteParamsInfo`;

    const body = requestBody({
      LiveWorkItemId: this.Parameters.LiveWorkItemId,
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

  async parseResponse(response: Response): Promise<msdyn_OCResetInviteParamsInfoResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_OCResetInviteParamsInfoResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_OCResetInviteParamsInfo response message
 */
export class msdyn_OCResetInviteParamsInfoResponse extends OrganizationResponse {
  constructor(public result: msdyn_OCResetInviteParamsInfoResponseData) {
    super("msdyn_OCResetInviteParamsInfo");
  }

  static fromResponse(data: unknown): msdyn_OCResetInviteParamsInfoResponse {
    return new msdyn_OCResetInviteParamsInfoResponse(
      responseObject<msdyn_OCResetInviteParamsInfoResponseData>(data)
    );
  }
}
