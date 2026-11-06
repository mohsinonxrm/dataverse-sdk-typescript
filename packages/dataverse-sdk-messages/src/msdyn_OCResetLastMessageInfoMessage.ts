import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_OCResetLastMessageInfoResponse as msdyn_OCResetLastMessageInfoResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_OCResetLastMessageInfo message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OCResetLastMessageInfoRequestParameters {
  LiveWorkItemId: string;
}

/**
 * msdyn_OCResetLastMessageInfo request message
 *
 * Web API Action: msdyn_OCResetLastMessageInfo
 */
export class msdyn_OCResetLastMessageInfoRequest
  extends OrganizationRequest
  implements Executable<msdyn_OCResetLastMessageInfoResponse>
{
  declare readonly Parameters: Readonly<msdyn_OCResetLastMessageInfoRequestParameters>;

  constructor(parameters: msdyn_OCResetLastMessageInfoRequestParameters) {
    super("msdyn_OCResetLastMessageInfo", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OCResetLastMessageInfo`;

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

  async parseResponse(response: Response): Promise<msdyn_OCResetLastMessageInfoResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_OCResetLastMessageInfoResponse.fromResponse({});
    return msdyn_OCResetLastMessageInfoResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_OCResetLastMessageInfo response message
 */
export class msdyn_OCResetLastMessageInfoResponse extends OrganizationResponse {
  constructor(public result: msdyn_OCResetLastMessageInfoResponseData) {
    super("msdyn_OCResetLastMessageInfo");
  }

  static fromResponse(data: unknown): msdyn_OCResetLastMessageInfoResponse {
    return new msdyn_OCResetLastMessageInfoResponse(
      responseObject<msdyn_OCResetLastMessageInfoResponseData>(data)
    );
  }
}
